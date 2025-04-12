"use client";
import "@/lib/fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import useGoogleSignIn from "./hooks/useGoogleSignIn";
import SignUp from "./components/SignUp";

library.add(faGoogle);

export default function SignUpPage() {
  const googleState = useGoogleSignIn();

  return (
    <SignUp state={googleState}>
      <SignUp.Title />
      <SignUp.Description />
      <SignUp.Error />
      <SignUp.Button />
      <SignUp.Footer />
    </SignUp>
  );
}
