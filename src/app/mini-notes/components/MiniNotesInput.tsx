import useFetch from "@/hooks/useFetch";
import React, { useEffect, useRef, useCallback } from "react";
import { useMiniNotesContext } from "./MiniNotesContext";
import { MINI_NOTES_ACTION } from "@/types/action";
import { Note } from "@/types/note";

function MiniNotesInput() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const { fetchData } = useFetch();
  const { state, dispatch } = useMiniNotesContext();
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!dispatch) return;
    dispatch({ type: MINI_NOTES_ACTION.TYPING, payload: event.target.value });
  }, [dispatch]);

  const handleSubmit = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!dispatch || !state.miniNotes.value.trim()) return;

    let data: Note | null = null;

    try {
      dispatch({ 
        type: MINI_NOTES_ACTION.SET_SUBMITTING, 
        payload: true 
      });
      
      data = await fetchData("/api/notes", "POST", { text: state.miniNotes.value }) as Note;
      dispatch({ type: MINI_NOTES_ACTION.SUBMIT_NOTE });
    } catch (err) {
      console.error("Error posting note:", err);
    } finally {
      dispatch({ 
        type: MINI_NOTES_ACTION.SET_SUBMITTING, 
        payload: false 
      });
      
      if (data) {
        dispatch({
          type: MINI_NOTES_ACTION.ADD_NOTE, 
          payload: data
        });
      }
    }
  }, [dispatch, fetchData, state.miniNotes.value]);

  /**
   * Effect to toggle the placeholder visibility based on input value.
   */
  useEffect(() => {
    if (placeholderRef.current) {
      if (state.miniNotes.value.length > 0) {
        placeholderRef.current.classList.add("hidden");
      } else {
        placeholderRef.current.classList.remove("hidden");
      }
    }
  }, [state.miniNotes.value]);

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
              value={state.miniNotes.value}
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
              {state.miniNotes.value.length} / 280
            </div>
            <button
              onClick={handleSubmit}
              disabled={state.miniNotes.ui.isSubmitting}
              className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
            >
              {state.miniNotes.ui.isSubmitting ? "Saving..." : "Take note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MiniNotesInput);
