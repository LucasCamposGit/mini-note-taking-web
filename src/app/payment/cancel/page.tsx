"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-700">
        <div className="mx-auto w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M13 21h-2a9 9 0 110-18h2a9 9 0 110 18z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-zinc-300 mb-6">Your payment process was cancelled. No charges were made.</p>
        <p className="text-zinc-400 mb-6">You can continue using the free plan or try upgrading again when you're ready.</p>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/payment">
            <span className="inline-block w-full px-4 py-2 bg-zinc-700 text-white rounded-xl hover:bg-zinc-600">
              Try Again
            </span>
          </Link>
          <Link href="/mini-notes">
            <span className="inline-block w-full px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200">
              Go to App
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
} 