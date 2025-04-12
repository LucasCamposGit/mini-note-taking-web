"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import useFetch from "@/hooks/useFetch";
import { useGoogleLogin } from "@react-oauth/google";
import { LOGIN_CONTEXT_ACTIONS, useLoginDispatch } from "@/context/LoginContext";
import { useRouter } from "next/navigation";

library.add(faGoogle);

export default function SignUpPage() {
  const { fetchData } = useFetch();
  const loginDispatch = useLoginDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const errorP = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchData("/api/google-login", "POST", {
          token: tokenResponse.access_token,
        }, false);

        if (data?.token && data?.refresh_token) {
          localStorage.setItem("access_token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          
          loginDispatch({
            type: LOGIN_CONTEXT_ACTIONS.LOGIN,
          });
          
          router.push("/mini-notes");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        setError("Failed to sign in with Google. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    },
  });

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
    if (buttonRef.current && spinnerRef.current && buttonTextRef.current) {
      if (isLoading) {
        buttonRef.current.disabled = true;
        buttonRef.current.style.opacity = "0.75";
        buttonRef.current.style.cursor = "not-allowed";
        spinnerRef.current.style.display = "block";
        buttonTextRef.current.textContent = "Signing in...";
      } else {
        buttonRef.current.disabled = false;
        buttonRef.current.style.opacity = "1";
        buttonRef.current.style.cursor = "pointer";
        spinnerRef.current.style.display = "none";
        buttonTextRef.current.textContent = "Continue with Google";
      }
    }
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
            className="text-xl"
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
