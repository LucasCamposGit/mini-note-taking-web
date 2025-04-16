"use client";

import MiniNotesCard from "./MiniNotesCard";
import MiniNotesContext from "./MiniNotesContext";
import MiniNotesInput from "./MiniNotesInput";
import MiniNotesTitle from "./MiniNotesTitle";
import { State } from "../types";

/**
 * Props for the MiniNotes component.
 */
interface MiniNotesProps {
  state: State;
  title: React.ReactNode;
  input: React.ReactNode;
  notes: React.ReactNode;
}

/**
 * Component for rendering the Mini Notes application.
 * It provides the context and layout for the notes, input, and title.
 *
 * @param {MiniNotesProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
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

/**
 * Renders the MiniNotes component with the provided context and children.
 */
MiniNotes.Title = MiniNotesTitle;
MiniNotes.Input = MiniNotesInput;
MiniNotes.Card = MiniNotesCard;

export default MiniNotes;