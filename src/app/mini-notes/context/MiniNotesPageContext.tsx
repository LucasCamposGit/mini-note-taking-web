"use client"; 
import { ReactNode, useReducer } from "react";
import { miniNotesPageReducer } from "@/store/rootReducer";
import { initialMiniNotesPageState } from "@/types/state";
import { DispatchContext } from "./DispatchContext";
import { NotesContext } from "./NotesContext";
import { UIContext } from "./UIContext";

export default function MiniNotesPageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    miniNotesPageReducer,
    initialMiniNotesPageState
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <UIContext.Provider value={state.ui}>
        <NotesContext.Provider value={state.notes}>
          {children}
        </NotesContext.Provider>
      </UIContext.Provider>
    </DispatchContext.Provider>
  );
}