import React, { createContext, useContext } from "react";
import { Dispatch } from "react";
import { Action } from "../../page";
import { CardAction, CardState } from "./MiniNotesCardReducer";

// Combine both state and card dispatch in a single context
interface MiniNotesCardContextType extends CardState {
  cardDispatch: React.Dispatch<CardAction>;
  dispatch: Dispatch<Action>; // App-level dispatch from props
}

export const MiniNotesCardContext = createContext<MiniNotesCardContextType | null>(null);

interface MiniNotesCardProviderProps {
  children: React.ReactNode;
  state: CardState;
  cardDispatch: React.Dispatch<CardAction>;
  dispatch: Dispatch<Action>; // App-level dispatch
}

export const MiniNotesCardProvider: React.FC<MiniNotesCardProviderProps> = ({ 
  children, 
  state,
  cardDispatch,
  dispatch
}) => {
  // Pass both state properties and the dispatchers
  const value = {
    ...state,
    cardDispatch,
    dispatch
  };

  return (
    <MiniNotesCardContext.Provider value={value}>
      {children}
    </MiniNotesCardContext.Provider>
  );
};

export const useMiniNotesCard = () => {
  const context = useContext(MiniNotesCardContext);
  if (!context) {
    throw new Error("useMiniNotesCard must be used within a MiniNotesCardProvider");
  }
  return context;
}; 