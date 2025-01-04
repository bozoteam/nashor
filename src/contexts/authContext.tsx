import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { AxiosResponse } from "axios";

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AccessTokenObject {
  access_token: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

interface AuthContextType {
  authUser: User | null; // Replace 'any' with your user type
  signOut: () => JSX.Element;
  signUpUsernamePwd: (username: string, password: string, name: string) => void;
  signInUsernamePwd: (username: string, password: string) => void;
  authLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  signOut: () => <Navigate to="/" />,
  signUpUsernamePwd: () => {},
  signInUsernamePwd: () => {},
  authLoading: true,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("access_token") && !authUser) {
      setAuthLoading(false);
      axiosInstance
        .get("/users/self", { withCredentials: true }) // implement endpoint for self user instead of /user/:username
        .then((response: AxiosResponse<User>) => {
          setAuthUser(response.data);
          setAuthLoading(false);
        });
    }
  }, []);

  const signInUsernamePwd = async (username: string, password: string) => {
    // Replace with actual sign-in logic
    console.log(username, password);
    try {
      axiosInstance
        .post("/auth", { username, password }, { withCredentials: true })
        .then((response: AxiosResponse<AccessTokenObject>) => {
          console.log(response);
          localStorage.setItem("access_token", response.data.access_token); // store token in local storage, axios interceptor will add it to header
          return axiosInstance.get(`/users/${username}`); // TODO: implement endpoint for self user instead of /user/:username
        })
        .then((response: AxiosResponse<User>) => {
          console.log(response);
          setAuthUser(response.data);
        });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const signUpUsernamePwd = (
    username: string,
    password: string,
    displayName: string
  ) => {
    // Replace with actual sign-up logic
    alert("Sign up logic not implemented");
  };

  const signOut = () => {
    setAuthUser(null);
    localStorage.removeItem("access_token");
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signOut,
        signUpUsernamePwd,
        signInUsernamePwd,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
