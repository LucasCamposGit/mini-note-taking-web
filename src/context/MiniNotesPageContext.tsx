"use client";
import { miniNotesPageReducer } from "@/store/rootReducer";
import { MiniNotesPageAction } from "@/types/action";
import { initialMiniNotesPageState, MiniNotesPageState } from "@/types/state";
import { createContext, useContext, useReducer, ReactNode } from "react";

// Create the context to store our state and dispatch function
interface MiniNotesContextType {
  state: MiniNotesPageState;
  dispatch: React.Dispatch<MiniNotesPageAction>;
}

// Initialize with a default value
const MiniNotesContext = createContext<MiniNotesContextType | undefined>(undefined);

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(miniNotesPageReducer, initialMiniNotesPageState);

  // Provide the state and dispatch to all children components
  return (
    <MiniNotesContext.Provider value={{ state, dispatch }}>
      {children}
    </MiniNotesContext.Provider>
  );
}

// Custom hooks to access state and dispatch
export function useMiniNotesPageState(): MiniNotesPageState {
  const context = useContext(MiniNotesContext);
  if (context === undefined) {
    throw new Error("useMiniNotesPageState must be used within an AppProvider");
  }
  return context.state;
}

export function useMiniNotesPageDispatch(): React.Dispatch<MiniNotesPageAction> {
  // This hook is used to access the dispatch function from the context
  const context = useContext(MiniNotesContext);
  if (context === undefined) {
    throw new Error("useMiniNotesPageDispatch must be used within an AppProvider");
  }
  return context.dispatch;
}

// Domain-specific selector hooks
export function useNotesState() {
  return useMiniNotesPageState().notes;
}

export function useUIState() {
  return useMiniNotesPageState().ui;
}

