"use client";

import { useMiniNotesContext } from "../../context";

interface InputButtonProps {
  onSubmitAction?: () => void;
}

export default function InputButton({ onSubmitAction }: InputButtonProps) {
  const { state } = useMiniNotesContext();
  
  return (
    <button
      onClick={onSubmitAction}
      disabled={state.miniNotes.ui.isSubmitting}
      className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
    >
      {state.miniNotes.ui.isSubmitting ? "Saving..." : "Take note"}
    </button>
  );
}
