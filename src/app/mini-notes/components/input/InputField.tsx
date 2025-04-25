"use client";
import { ChangeEvent, useEffect, useRef } from "react";
import { NOTES_ACTION } from "@/types/action";
import  useDispatch  from "../../context/DispatchContext";
import  useNotes  from "../../context/NotesContext";

export default function InputField() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const notes = useNotes();

  useEffect(() => {
    if (placeholderRef.current && notes.currentNote.text.length > 0) {
      placeholderRef.current.style.opacity = "0";
    } 
    
    if (placeholderRef.current && notes.currentNote.text.length == 0) {
      placeholderRef.current.style.opacity = "1";
    }
  }
  , [notes.currentNote.text]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: NOTES_ACTION.SET_CURRENT_NOTE_TEXT,
      payload: e.target.value
    });
  };

  return (
    <div className="relative">
      <textarea
        className="w-full p-3 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer min-h-[80px]"
        onChange={handleChange}
        value={notes.currentNote.text}
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
