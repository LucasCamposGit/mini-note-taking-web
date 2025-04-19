"use client";
import { ChangeEvent, use, useEffect, useRef } from "react";
import { useMiniNotesContext } from "../../context";
import { MINI_NOTES_ACTION } from "@/types/action";

export default function InputField() {
  const { state, dispatch } = useMiniNotesContext();
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (placeholderRef.current && state.miniNotes.value.length > 0) {
      placeholderRef.current.style.opacity = state.miniNotes.value ? "0" : "1";
    }
  }
  , [state.miniNotes.value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: MINI_NOTES_ACTION.TYPING,
      payload: e.target.value
    });
  };

  return (
    <div className="relative">
      <textarea
        className="w-full p-3 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer min-h-[80px]"
        onChange={handleChange}
        value={state.miniNotes.value}
      ></textarea>
      <div
        ref={placeholderRef}
        className="absolute top-3 left-3 pointer-events-none text-sm transition-opacity duration-200 peer-focus:opacity-0"
      >
        <span className="text-blue-400">Write your deepest thought</span>{" "}
        <span className="text-zinc-500">— begin with a whisper</span>
      </div>
    </div>
  );
}
