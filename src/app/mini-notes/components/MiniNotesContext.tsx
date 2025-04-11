"use client";

import { createContext, useContext } from "react";

const MiniNotesContext = createContext(undefined);

export function useMiniNotesContext() {
  const context = useContext(MiniNotesContext);
  if (!context) {
    throw new Error(
      "MiniNotes.* component must be rendered as child of MiniNotesContext"
    );
  }
  return context;
}

export default MiniNotesContext;