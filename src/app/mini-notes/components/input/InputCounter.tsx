"use client";

import { useMiniNotesPageState } from "../../context";

export default function InputCounter() {
  const state = useMiniNotesPageState();

  return (
    <div className="text-sm text-gray-400">
      {state.notes.currentNote.text.length} / 280
    </div>
  );
}
