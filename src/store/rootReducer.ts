import { AppState, initialAppState } from "@/types/state";
import { AppAction } from "@/types/action";
import { notesReducer } from "./notes/notesReducer";
import { uiReducer } from "./ui/uiReducer";
import { authReducer } from "./auth/authReducer";

// Root reducer that combines all domain reducers
export const appReducer = (state: AppState = initialAppState, action: AppAction): AppState => {
  return {
    notes: notesReducer(state.notes, action as any),
    ui: uiReducer(state.ui, action as any),
    auth: authReducer(state.auth, action as any)
  };
};