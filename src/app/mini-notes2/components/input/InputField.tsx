"use client";
import { useMiniNotesContext } from "../../context";

export default function InputField() {
    const { state } = useMiniNotesContext();
  
  return (
    <div className="relative">
      <textarea
        className="w-full p-2 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer"
        // onChange={handleChange}
        value={state.miniNotes.value}
      ></textarea>
      <div
        // ref={placeholderRef}
        className="absolute top-2 left-2 pointer-events-none text-sm peer-focus:hidden"
      >
        <span className="text-zinc-400">Write your deepest thought</span>{" "}
        <span className="text-zinc-500">— begin with a whisper</span>
      </div>
    </div>
  );
}
