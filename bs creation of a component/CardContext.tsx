import { createContext, useContext } from "react";
import { State } from "./types";


export const CardContext = createContext< | null>(null);

interface MiniNotesCardProviderProps {
  state: State;
}

export const useMiniNotesCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useMiniNotesCard must be used within a MiniNotesCardProvider");
  }
  return context;
}; 

