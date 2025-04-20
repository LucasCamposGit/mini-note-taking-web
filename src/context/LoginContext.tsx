"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";
import { authReducer } from "@/store/auth/authReducer";
import { AuthState, initialAuthState } from "@/types/state";
import { AuthAction, AUTH_ACTION } from "@/types/action";

interface Props {
  children: React.ReactNode;
}

// Initialize auth state with values from localStorage if available
const getInitialAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (accessToken && refreshToken) {
      return {
        ...initialAuthState,
        isAuthenticated: true,
        tokens: {
          accessToken,
          refreshToken
        }
      };
    }
  }
  return initialAuthState;
};

const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction> | undefined>(undefined);

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch(): React.Dispatch<AuthAction> {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}

// Helper functions for common auth actions
export function useAuthActions() {
  const dispatch = useAuthDispatch();
  
  return {
    login: (token: string, refreshToken: string, user: any) => {
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      
      dispatch({
        type: AUTH_ACTION.LOGIN_SUCCESS,
        payload: {
          token,
          refreshToken,
          user
        }
      });
    },
    
    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      
      dispatch({
        type: AUTH_ACTION.LOGOUT
      });
    },
    
    refreshToken: (token: string, refreshToken: string) => {
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      
      dispatch({
        type: AUTH_ACTION.REFRESH_TOKEN_SUCCESS,
        payload: {
          token,
          refreshToken
        }
      });
    }
  };
}

export function LoginProvider({ children }: Props) {
  const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState());

  // You can add token refresh logic or other auth-related effects here
  useEffect(() => {
    // Example: Token refresh logic could go here
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

// For backward compatibility with existing code
export const useLogin = useAuth;
export const useLoginDispatch = useAuthDispatch;