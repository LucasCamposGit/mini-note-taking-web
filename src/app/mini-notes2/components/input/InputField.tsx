"use client";
import { useMiniNotesContext } from "../../context";

export default function InputField() {
  const { state } = useMiniNotesContext();

  return (
    <div className="relative">
      <textarea
        className="w-full p-3 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer min-h-[80px]"
        // onChange={handleChange}
        value={state.miniNotes.value}
      ></textarea>
      <div
        // ref={placeholderRef}
        className="absolute top-3 left-3 pointer-events-none text-sm transition-opacity duration-200 peer-focus:opacity-0"
      >
        <span className="text-blue-400">Write your deepest thought</span>{" "}
        <span className="text-zinc-500">— begin with a whisper</span>
      </div>
    </div>
  );
}
