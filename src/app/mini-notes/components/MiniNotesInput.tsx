import useFetch from "@/hooks/useFetch";
import React, { Dispatch, useContext, useEffect, useReducer, useRef } from "react";
import { ACTION, Note, NoteAction } from "../types";
import MiniNotesContext from "./MiniNotesContext";

/**
 * Props for the MiniNotesInput component.
 */
interface MiniNotesInputProps {
  dispatch: Dispatch<NoteAction>;
}

/**
 * Component for the input area where users can type and submit notes.
 *
 * @param {MiniNotesInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function MiniNotesInput({ dispatch }: MiniNotesInputProps ) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const { fetchData } = useFetch();
  const state = useContext(MiniNotesContext);

  /**
   * Handles changes in the textarea and dispatches typing actions.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
   */
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: ACTION.TYPING, payload: event.target.value });
  }

  /**
   * Handles the submit action for the note input.
   *
   * @param {React.MouseEvent} event - The mouse event.
   */
  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    if (!state.value.trim()) return;

    let data: Note | null = null;

    try {
      dispatch({ 
        type: ACTION.SET_SUBMITTING, 
        payload: true 
      });
      
      data = await fetchData("/api/notes", "POST", { text: state.value }) as Note;
      dispatch({ type: ACTION.SUBMIT_NOTE });
    } catch (err) {
      console.error("Error posting note:", err);
    } finally {
      dispatch({ 
        type: ACTION.SET_SUBMITTING, 
        payload: false 
      });
      
      if (data) {
        dispatch({
          type: ACTION.ADD_NOTE, 
          payload: data
        });
      }
    }
  }

  /**
   * Effect to toggle the placeholder visibility based on input value.
   */
  useEffect(() => {
    if (placeholderRef.current) {
      if (state.value.length > 0) {
        placeholderRef.current.classList.add("hidden");
      } else {
        placeholderRef.current.classList.remove("hidden");
      }
    }
  }, [state.value]);

  /**
   * Renders the input area with a textarea and submit button.
   */
  return (
    <div className="p-4 rounded-xl note-card mb-4">
      <div className="flex">
        <div className="flex-grow">
          <div className="relative">
            <textarea
              className="w-full p-2 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer"
              onChange={handleChange}
              value={state.value}
            ></textarea>
            <div
              ref={placeholderRef}
              className="absolute top-2 left-2 pointer-events-none text-sm peer-focus:hidden"
            >
              <span className="text-zinc-400">Write your deepest thought</span>{" "}
              <span className="text-zinc-500">— begin with a whisper</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-400">
              {state.value.length} / 280
            </div>
            <button
              onClick={handleSubmit}
              disabled={state.ui.isSubmitting}
              className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
            >
              {state.ui.isSubmitting ? "Saving..." : "Take note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
