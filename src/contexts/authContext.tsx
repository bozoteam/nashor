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
        .get("/auth/me", { withCredentials: true }) // implement endpoint for self user instead of /user/:username
        .then((response: AxiosResponse<User>) => {
          setAuthUser(response.data);
          setAuthLoading(false);
        });
    }
  }, []);

  const signInUsernamePwd = async (username: string, password: string) => {
    // Replace with actual sign-in logic
    try {
      axiosInstance
        .post("/auth", { username, password }, { withCredentials: true })
        .then((response: AxiosResponse<AccessTokenObject>) => {
          localStorage.setItem("access_token", response.data.access_token); // store token in local storage, axios interceptor will add it to header
          return axiosInstance.get(`/auth/me`);
        })
        .then((response: AxiosResponse<User>) => {
          setAuthUser(response.data);
        });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const signUpUsernamePwd = (
    username: string,
    password: string,
    name: string
  ) => {
    // Replace with actual sign-up logic
    try {
      axiosInstance
        .post("/users", { username, password, name })
        .then((response: AxiosResponse<{ message: string }>) => {
          if (response.status === 201)
            return axiosInstance.post(
              "/auth",
              { username, password },
              { withCredentials: true }
            );
          else throw new Error(response.data.message);
        })
        .then((response: AxiosResponse<AccessTokenObject>) => {
          localStorage.setItem("access_token", response.data.access_token); // store token in local storage, axios interceptor will add it to header
          return axiosInstance.get(`/auth/me`);
        })
        .then((response: AxiosResponse<User>) => {
          setAuthUser(response.data);
        });
    } catch (error) {
      console.error("Sign up error:", error);
    }
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
