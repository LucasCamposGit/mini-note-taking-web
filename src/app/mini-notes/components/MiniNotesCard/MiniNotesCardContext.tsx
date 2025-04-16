import React, { createContext, useContext } from "react";
import { Dispatch } from "react";
import { NoteAction } from "../../types";
import { CardAction, CardState } from "./MiniNotesCardReducer";

/**
 * Context type combining card state and dispatch functions.
 */
interface MiniNotesCardContextType extends CardState {
  cardDispatch: React.Dispatch<CardAction>;
  dispatch: Dispatch<NoteAction>; // App-level dispatch from props
}

/**
 * Context for managing the state and actions of MiniNotesCard.
 */
export const MiniNotesCardContext = createContext<MiniNotesCardContextType | null>(null);

/**
 * Props for the MiniNotesCardProvider component.
 */
interface MiniNotesCardProviderProps {
  children: React.ReactNode;
  state: CardState;
  cardDispatch: React.Dispatch<CardAction>;
  dispatch: Dispatch<NoteAction>; // App-level dispatch
}

/**
 * Provider component for MiniNotesCard context.
 *
 * @param {MiniNotesCardProviderProps} props - The props for the provider.
 * @returns {JSX.Element} The provider component with context value.
 */
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

  /**
   * Renders the provider with the given context value.
   */
  return (
    <MiniNotesCardContext.Provider value={value}>
      {children}
    </MiniNotesCardContext.Provider>
  );
};

/**
 * Custom hook to use the MiniNotesCard context.
 *
 * @returns {MiniNotesCardContextType} The current context value.
 * @throws Will throw an error if the context is used outside of its provider.
 */
export const useMiniNotesCard = () => {
  const context = useContext(MiniNotesCardContext);
  if (!context) {
    throw new Error("useMiniNotesCard must be used within a MiniNotesCardProvider");
  }
  return context;
}; 