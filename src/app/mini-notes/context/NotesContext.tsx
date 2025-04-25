import { createContext, useContext } from "react";
import { NotesState } from "@/types/state";

// Create the context with an initial undefined value
export const NotesContext = createContext<NotesState | undefined>(undefined);

// Custom hook to use the notes context
export default function useNotes() {
  const context = useContext(NotesContext);
  
  if (context === undefined) {
    throw new Error("useNotes must be used within a MiniNotesPageProvider");
  }
  
  return context;
}