"use client";

import MiniNotesCard from "./MiniNotesCard";
import MiniNotesContext from "./MiniNotesContext";
import MiniNotesInput from "./MiniNotesInput";
import MiniNotesNote from "./MiniNotesNote";
import MiniNotesReply from "./MiniNotesReply";
import MiniNotesTitle from "./MiniNotesTitle";

interface MiniNotesProps {
  state: any;
  title: React.ReactNode;
  input: any;
  notes: any;
}

function MiniNotes({ state, title, input, notes }: MiniNotesProps) {
  return (
    <MiniNotesContext.Provider value={state}>
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
MiniNotes.Reply = MiniNotesReply;
MiniNotes.Note = MiniNotesNote;

export default MiniNotes;