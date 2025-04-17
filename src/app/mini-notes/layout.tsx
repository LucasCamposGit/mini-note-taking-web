// app/mini-notes/layout.tsx (or wherever your layout is)
import React, { PropsWithChildren, Suspense } from "react";

export default function MiniNotesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
    </div>
  );
}
