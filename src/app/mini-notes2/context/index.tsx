"use client";

import { createContext, useContext, Dispatch } from "react";
import { RootState, RootAction } from "@/reducers/rootReducer";
import { initialMiniNotesState } from "@/reducers/miniNotesReducer";
import { initialCardState } from "@/reducers/cardReducer";

// Define context type with state and dispatch
interface MiniNotesContextType {
  state: RootState;
  dispatch: Dispatch<RootAction>;
}

const initialState: RootState = {
  card: initialCardState,
  miniNotes: initialMiniNotesState
};

// Initialize context with dummy dispatch function
const initialContextValue: MiniNotesContextType = {
  state: initialState,
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