import {
  // GoogleAuthProvider,
  signOut,
  // signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
  sendEmailVerification,
  // updateProfile,
} from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import auth from "./firebase/firebase";
import axiosInstance from "../utils/axios";

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextType {
  authUser: User | null;
  signOutFromWebsite: () => JSX.Element;
  signUpEmailPwd: (
    email: string,
    password: string,
    displayName: string
  ) => void;
  signInEmailPwd: (email: string, password: string) => void;
  // signInGoogle: () => void;
  authLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// const provider = new GoogleAuthProvider();

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  signOutFromWebsite: () => <Navigate to="/" />,
  signUpEmailPwd: () => {},
  signInEmailPwd: () => {},
  // signInGoogle: () => {},
  authLoading: true,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user)
        user?.getIdToken().then((token) => {
          setIdToken(token);
        });
      else setIdToken(null);

      setAuthLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

  // Sempre que idToken mudar, atualiza o cabeçalho Authorization
  useEffect(() => {
    if (idToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${idToken}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [idToken]);

  // const signInGoogle = async () => {
  //   signInWithPopup(auth, provider).catch((error) => {
  //     alert(error.message);
  //   });
  // };

  const signInEmailPwd = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error.message);
    });
  };

  const signUpEmailPwd = (
    email: string,
    password: string,
    displayName: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
        updateProfile(userCredential.user, {
          displayName: displayName,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOutFromWebsite = () => {
    signOut(auth)
      .then(() => {
        console.warn("signed out");
        setAuthUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signOutFromWebsite,
        signUpEmailPwd,
        signInEmailPwd,
        // signInGoogle,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
