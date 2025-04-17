"use client";

import React, { Dispatch, useMemo } from "react";
import { MiniNotesState } from "@/types/state";
import MiniNotesCard from "./MiniNotesCard";
import MiniNotesContext from "./MiniNotesContext";
import MiniNotesInput from "./MiniNotesInput";
import MiniNotesTitle from "./MiniNotesTitle";
import { RootAction, RootState } from "@/reducers/rootReducer";

interface MiniNotesProps {
  state: RootState;
  title: React.ReactNode;
  input: React.ReactNode;
  notes: React.ReactNode;
  dispatch: Dispatch<RootAction>;
}

function MiniNotes({ state, title, input, notes, dispatch }: MiniNotesProps) {
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state, 
    dispatch 
  }), [state, dispatch]);

  return (
    <MiniNotesContext.Provider value={contextValue}>
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          {title}
          {input}
          {notes}
        </div>
      </main>
    </MiniNotesContext.Provider>
  );
}

MiniNotes.Title = MiniNotesTitle;
MiniNotes.Input = MiniNotesInput;
MiniNotes.Card = MiniNotesCard;

export default MiniNotes;