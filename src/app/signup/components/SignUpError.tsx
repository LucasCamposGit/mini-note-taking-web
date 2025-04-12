"use client";
import { useSignUpContext } from "./SignUpContext";
import { useEffect, useRef } from "react";

export default function SignUpError() {
  const { error } = useSignUpContext();
  const errorP = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (errorP.current) {
      errorP.current.style.opacity = error ? "1" : "0";
    }
  }, [error]);

  return (
    <p
      ref={errorP}
      className="text-red-500 text-sm transition-opacity duration-300"
    >
      {error}
    </p>
  );
}
