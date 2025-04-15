import { createContext, useContext } from "react";
import { State } from "./types";
import { initialCardState } from "./reducer";


export const CardContext = createContext<State>(initialCardState);

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

