"use client";

import { createContext, useContext, Dispatch } from "react";
import { MiniNotesPageState, initialMiniNotesPageState } from "@/types/state";
import { MiniNotesPageAction } from "@/types/action";

// Define context type with state and dispatch
interface MiniNotesContextType {
  state: MiniNotesPageState;
  dispatch: Dispatch<MiniNotesPageAction>;
}

// Initialize context with dummy dispatch function
const initialContextValue: MiniNotesContextType = {
  state: initialMiniNotesPageState,
  dispatch: () => null
};

const MiniNotesContext = createContext<MiniNotesContextType>(initialContextValue);

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