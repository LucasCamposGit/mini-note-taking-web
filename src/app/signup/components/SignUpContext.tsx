"use client";
import { createContext, useContext } from "react";

export interface SignUpContextType {
  error: string | null;
  isLoading: boolean;
  login: () => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export function useSignUpContext() {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("SignUp.* must be used within <SignUp />");
  }
  return context;
}

export default SignUpContext;
