"use client";

import  useNotes  from "../../context/NotesContext";


export default function InputCounter() {
  const notes = useNotes();

  return (
    <div className="text-sm text-gray-400">
      {notes.currentNote.text.length} / 280
    </div>
  );
}
