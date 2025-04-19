import { createContext, useContext, useReducer, ReactNode } from "react";
import { appReducer } from "@/store/rootReducer";
import { AppState, initialAppState } from "@/types/state";
import { AppAction } from "@/types/action";

// Create the context to store our state and dispatch function
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Initialize with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // Provide the state and dispatch to all children components
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hooks to access state and dispatch
export function useAppState(): AppState {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context.state;
}

export function useAppDispatch(): React.Dispatch<AppAction> {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }
  return context.dispatch;
}

// Domain-specific selector hooks
export function useNotesState() {
  return useAppState().notes;
}

export function useUIState() {
  return useAppState().ui;
}

export function useAuthState() {
  return useAppState().auth;
}