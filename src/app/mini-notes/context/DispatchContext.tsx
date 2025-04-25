import { MiniNotesPageAction } from "@/types/action";
import { createContext, useContext } from "react";

// Create the context with an initial undefined value
export const DispatchContext = createContext<React.Dispatch<MiniNotesPageAction> | undefined>(undefined);

// Custom hook to use the dispatch context
export default function useDispatch() {
  const context = useContext(DispatchContext);
  
  if (context === undefined) {
    throw new Error("useDispatch must be used within a MiniNotesPageProvider");
  }
  
  return context;
}