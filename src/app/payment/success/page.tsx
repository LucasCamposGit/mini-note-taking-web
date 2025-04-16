"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const sessionId = searchParams?.get("session_id");
    
    if (!sessionId) {
      setStatus("error");
      setMessage("Invalid session information");
      return;
    }
    
    // Verify the payment with your backend
    const verifyPayment = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to verify payment");
        }
        
        const data = await response.json();
        setStatus("success");
        setMessage(data.message || "Your payment was successful! Your account has been upgraded.");
      } catch (error) {
        setStatus("error");
        setMessage("We couldn't verify your payment. Please contact support.");
      }
    };
    
    verifyPayment();
  }, [searchParams, router]);
  
  return (
    <div className="max-w-md mx-auto text-center bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-700">
      {status === "loading" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Processing Your Payment</h1>
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
          <p className="text-zinc-400">Please wait while we confirm your payment...</p>
        </>
      )}
      
      {status === "success" && (
        <>
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-zinc-300 mb-6">{message}</p>
          <p className="text-zinc-400 mb-6">Thank you for upgrading your account. You now have access to all premium features.</p>
          <Link href="/mini-notes">
            <span className="inline-block w-full px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200">
              Start Using Premium Features
            </span>
          </Link>
        </>
      )}
      
      {status === "error" && (
        <>
          <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-zinc-300 mb-6">{message}</p>
          <p className="text-zinc-400 mb-6">If you believe this is an error, please contact our support team.</p>
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
        </>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-md mx-auto text-center bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-700">
      <h1 className="text-2xl font-bold mb-4">Loading Payment Details</h1>
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
      <p className="text-zinc-400">Please wait a moment...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentSuccessContent />
      </Suspense>
    </main>
  );
} 