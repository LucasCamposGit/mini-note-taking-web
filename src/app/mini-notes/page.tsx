"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";

export default function MiniNotesPage() {
  return (
    <MiniNotes
      state={undefined}
      title={<MiniNotes.Title />}
      input={<MiniNotes.Input />}
      notes={
        <MiniNotes.Card>
          <MiniNotes.Note />
          <MiniNotes.Reply />
        </MiniNotes.Card>
      }
    />
  );
}
