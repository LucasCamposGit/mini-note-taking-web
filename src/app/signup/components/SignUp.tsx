"use client";

import SignUpContext, { SignUpContextType } from "./SignUpContext";
import SignUpTitle from "@/app/signup/components/SignUpTitle";
import SignUpDescription from "@/app/signup/components/SignUpDescription";
import SignUpError from "@/app/signup/components/SignUpError";
import SignUpButton from "@/app/signup/components/SignUpButton";
import SignUpFooter from "@/app/signup/components/SignUpFooter";

interface SignUpProps {
  state: SignUpContextType;
  children: React.ReactNode;
}

function SignUp({ state, children }: SignUpProps) {
  return (
    <SignUpContext.Provider value={state}>
      <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm text-center space-y-6">
          {children}
        </div>
      </main>
    </SignUpContext.Provider>
  );
}

SignUp.Title = SignUpTitle;
SignUp.Description = SignUpDescription;
SignUp.Error = SignUpError;
SignUp.Button = SignUpButton;
SignUp.Footer = SignUpFooter;

export default SignUp;
