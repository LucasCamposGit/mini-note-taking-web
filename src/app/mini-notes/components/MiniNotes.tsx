"use client";

import { Dispatch } from "react";
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
  return (
    <MiniNotesContext.Provider value={{ 
      state, 
      dispatch 
    }}>
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