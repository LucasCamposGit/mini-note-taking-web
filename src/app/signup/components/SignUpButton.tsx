"use client";
import { useSignUpContext } from "./SignUpContext";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUpButton() {
  const { isLoading, login } = useSignUpContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

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
    <button
      ref={buttonRef}
      onClick={login}
      className="w-full flex items-center justify-center space-x-3 px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition"
    >
      <div
        ref={spinnerRef}
        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin hidden"
      />
      <FontAwesomeIcon
        icon={["fab", "google"]}
        className="text-xl w-5"
        style={{ display: isLoading ? "none" : "block" }}
      />
      <span ref={buttonTextRef}>Continue with Google</span>
    </button>
  );
}
