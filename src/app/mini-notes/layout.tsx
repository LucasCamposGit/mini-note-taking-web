// app/mini-notes/layout.tsx (or wherever your layout is)
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the MiniNotesPage client component
const MiniNotesPage = dynamic(() => import("./page"), {
  ssr: false,
  suspense: true,
});

export default function MiniNotesLayout() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <Suspense
          fallback={
            <>
              <div className="mb-6 animate-pulse">
                <div className="h-8 bg-white rounded-lg w-3/4"></div>
              </div>

              <div className="mb-6 animate-pulse">
                <div className="h-24 bg-white rounded-xl w-full"></div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-zinc-800/50 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </>
          }
        >
          <MiniNotesPage />
        </Suspense>
      </div>
    </main>
  );
}
