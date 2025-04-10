import Image from "next/image";

import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Mini Note-Taking
        </h1>
        <p className="text-lg text-zinc-300">
          A minimalist note-taking app for those tired of noise and overload.
        </p>
        <p className="text-md text-zinc-400">
          Post short notes. Answer yourself. Keep it simple.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          <div className="border border-zinc-700 rounded-2xl p-6 shadow-sm bg-zinc-800">
            <h2 className="text-xl font-semibold">Free Plan</h2>
            <p className="text-sm text-zinc-400 mt-2">Up to 280 characters per note.</p>
            <p className="text-sm text-zinc-400">Basic usage. Minimalist forever.</p>
            <Link href="/signup">
              <span className="inline-block mt-4 px-4 py-2 text-sm bg-white text-black rounded-xl hover:bg-zinc-200">
                Start Free
              </span>
            </Link>
          </div>

          <div className="border border-zinc-700 rounded-2xl p-6 shadow-md bg-zinc-800">
            <h2 className="text-xl font-semibold">$2/month</h2>
            <p className="text-sm text-zinc-400 mt-2">Write up to 560 characters per note.</p>
            <p className="text-sm text-zinc-400">Support the movement. Think deeper.</p>
            <Link href="/signup">
              <span className="inline-block mt-4 px-4 py-2 text-sm bg-white text-black rounded-xl hover:bg-zinc-200">
                Upgrade Now
              </span>
            </Link>
          </div>
        </div>

        <footer className="mt-12 text-sm text-zinc-500">
          Built for those seeking less. © {new Date().getFullYear()} Quiet Notes
        </footer>
      </div>
    </main>
  );
}
