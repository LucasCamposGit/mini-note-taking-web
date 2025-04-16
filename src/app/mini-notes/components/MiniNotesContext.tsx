"use client";

import { createContext, useContext } from "react";
import { State } from "../types";

/**
 * Initial state for the MiniNotes context.
 * @type {State}
 */
const initialState: State = {
  notes: null,
  value: "",
  ui: {
    isEditing: false,
    isReplying: false,
    activeNoteId: null,
    isSubmitting: false
  }
};

/**
 * Context for managing the state of MiniNotes.
 */
const MiniNotesContext = createContext<State>(initialState);

/**
 * Hook to use the MiniNotes context.
 *
 * @returns {State} The current state from the context.
 * @throws Will throw an error if the context is used outside of its provider.
 */
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