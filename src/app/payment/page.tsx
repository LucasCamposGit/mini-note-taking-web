"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

// We can use a public key for the frontend
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubscription = async (planType: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      // Call your Golang backend to create a checkout session
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planType,
        }),
        credentials: "include", // Send cookies with the request if using cookie-based auth
      });
      
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      
      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }
      
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Upgrade Your Plan
        </h1>
        <p className="text-lg text-zinc-300">
          Choose a plan that works for you
        </p>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          <div className="border border-zinc-700 rounded-2xl p-6 shadow-sm bg-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">Free Plan</h2>
                <p className="text-2xl font-bold mt-2">$0</p>
              </div>
              <span className="px-2 py-1 bg-zinc-700 text-xs rounded-full">Current</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Up to 280 characters per note</li>
              <li>• Basic usage</li>
              <li>• Minimalist forever</li>
            </ul>
            <Link href="/mini-notes">
              <span className="inline-block w-full mt-4 px-4 py-2 text-sm bg-zinc-700 text-white rounded-xl hover:bg-zinc-600">
                Continue with Free
              </span>
            </Link>
          </div>

          <div className="border border-zinc-700 rounded-2xl p-6 shadow-md bg-zinc-800 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div>
              <h2 className="text-xl font-semibold">Premium Plan</h2>
              <p className="text-2xl font-bold mt-2">$2<span className="text-sm text-zinc-400">/month</span></p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Write up to 560 characters per note</li>
              <li>• Support the movement</li>
              <li>• Think deeper</li>
            </ul>
            <button
              onClick={() => handleSubscription("premium")}
              disabled={isLoading}
              className="inline-block w-full mt-4 px-4 py-2 text-sm bg-white text-black rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Upgrade Now"}
            </button>
          </div>
        </div>

        <p className="text-sm text-zinc-500 mt-6">
          Payments are securely processed through Stripe.
        </p>

        <footer className="mt-12 text-sm text-zinc-500">
          Built for those seeking less. © {new Date().getFullYear()} Quiet Notes
        </footer>
      </div>
    </main>
  );
} 