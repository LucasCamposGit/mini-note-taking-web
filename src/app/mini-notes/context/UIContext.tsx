import { createContext, useContext } from "react";
import { UIState } from "@/types/state";

// Create the context with an initial undefined value
export const UIContext = createContext<UIState | undefined>(undefined);

// Custom hook to use the UI context
export default function useUI() {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error("useUI must be used within a MiniNotesPageProvider");
  }
  
  return context;
}