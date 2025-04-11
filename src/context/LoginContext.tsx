"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";

export interface Action {
  type: LOGIN_CONTEXT_ACTIONS;
  payload?: State;
}

interface State {
  logged: boolean;
  token: string | null;
  refresh_token: string | null;
}

interface Props {
  children: React.ReactNode;
}

let tokenStorage: string | null = null;
let refreshTokenStorage: string | null = null;
let loginDefault = false;

if (typeof window !== "undefined") {
  tokenStorage = localStorage.getItem("access_token");
  refreshTokenStorage = localStorage.getItem("refresh_token");
  loginDefault = !!tokenStorage && !!refreshTokenStorage;
}

const LoggedContext = createContext<State | undefined>(undefined);
const LoginDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export function useLogin(): State {
  const context = useContext(LoggedContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}

export function useLoginDispatch(): React.Dispatch<Action> {
  const context = useContext(LoginDispatchContext);
  if (context === undefined) {
    throw new Error("useLoginDispatch must be used within a LoginProvider");
  }
  return context;
}

export enum LOGIN_CONTEXT_ACTIONS {
  LOGIN = "login",
  LOGOUT = "logout",
  REFRESH_TOKEN = "refresh_token",
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case LOGIN_CONTEXT_ACTIONS.LOGIN: {
      const token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      return {
        ...state,
        logged: true,
        token,
        refresh_token,
      };
    }
    case LOGIN_CONTEXT_ACTIONS.LOGOUT: {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return {
        logged: false,
        token: null,
        refresh_token: null,
      };
    }
    case LOGIN_CONTEXT_ACTIONS.REFRESH_TOKEN: {
      if (!action.payload?.token || !action.payload?.refresh_token) {
        return {
          logged: false,
          token: null,
          refresh_token: null,
        };
      }
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
      return {
        ...state,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
      };
    }
    default:
      throw new Error("Invalid action type");
  }
}

const defaultLoginState: State = {
  logged: loginDefault,
  token: tokenStorage,
  refresh_token: refreshTokenStorage,
};

export function LoginProvider({ children }: Props) {
  const [loginState, loginDispatch] = useReducer(reducer, defaultLoginState);

  useEffect(() => {}, []);

  return (
    <LoggedContext.Provider value={loginState}>
      <LoginDispatchContext.Provider value={loginDispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoggedContext.Provider>
  );
}