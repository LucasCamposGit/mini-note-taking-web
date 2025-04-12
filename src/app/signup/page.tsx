"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import useGoogleSignIn from "./hooks/useGoogleSignIn";

library.add(faGoogle);

export default function SignUpPage() {
  const errorP = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const { login, isLoading, error } = useGoogleSignIn()
  

  useEffect(() => {
    if (errorP.current) {
      if (error) {
        errorP.current.style.opacity = "1";
      } else {
        errorP.current.style.opacity = "0";
      }
    }
  }, [error]);

  useEffect(() => {
    const button = buttonRef.current;
    const spinner = spinnerRef.current;
    const text = buttonTextRef.current;
  
    if (!button || !spinner || !text) return;
  
    const isActive = !isLoading;
  
    button.disabled = !isActive;
    button.style.opacity = isActive ? "1" : "0.75";
    button.style.cursor = isActive ? "pointer" : "not-allowed";
    spinner.style.display = isActive ? "none" : "block";
    text.textContent = isActive ? "Continue with Google" : "Signing in...";
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-zinc-400 text-sm">
          One button. No passwords. Just Google.
        </p>

        <p ref={errorP} className="text-red-500 text-sm transition-opacity duration-300">
          {error}
        </p>

        <button 
          ref={buttonRef}
          onClick={() => login()}
          className="w-full flex items-center justify-center space-x-3 px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition"
        >
          <div 
            ref={spinnerRef} 
            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin hidden"
          />
          <FontAwesomeIcon 
            icon={["fab", "google"]} 
            className="text-xl w-5"
            style={{ display: isLoading ? 'none' : 'block' }}
          />
          <span ref={buttonTextRef}>Continue with Google</span>
        </button>

        <footer className="text-xs text-zinc-500 mt-12">
          Minimal login. © {new Date().getFullYear()} Quiet Notes
        </footer>
      </div>
    </main>
  );
}
