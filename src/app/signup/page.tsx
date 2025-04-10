import React from "react";
import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-zinc-400 text-sm">One button. No passwords. Just Google.</p>

        <button
          className="w-full flex items-center justify-center space-x-3 px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition"
        >
          <FontAwesomeIcon icon={["fab", "google"]} className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <footer className="text-xs text-zinc-500 mt-12">
          Minimal login. © {new Date().getFullYear()} Quiet Notes
        </footer>
      </div>
    </main>
  );
}
