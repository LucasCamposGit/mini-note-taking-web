"use client";

import { useMiniNotesContext } from "../../context";
import { MINI_NOTES_ACTION } from "@/types/action";
import useFetch from "@/hooks/useFetch";
import { useCallback } from "react";
import { Note } from "@/types/note";

interface InputButtonProps {
  onSubmitAction?: () => void;
}

export default function InputButton({ onSubmitAction }: InputButtonProps) {
  const { state, dispatch } = useMiniNotesContext();
  const { fetchData } = useFetch();
  
  const handleSubmit = useCallback(async () => {
    // Don't submit if empty or already submitting
    if (!state.miniNotes.value.trim() || state.miniNotes.ui.isSubmitting) {
      return;
    }
    
    // Set submitting state to true
    dispatch({
      type: MINI_NOTES_ACTION.SET_SUBMITTING,
      payload: true
    });
    
    try {
      // Call API to create a new note
      const response = await fetchData("/api/notes", "POST", {
        text: state.miniNotes.value
      });
      
      // Add the new note to the state
      if (response) {
        dispatch({
          type: MINI_NOTES_ACTION.ADD_NOTE,
          payload: response as Note
        });
        
        // Clear the input
        dispatch({
          type: MINI_NOTES_ACTION.SUBMIT_NOTE
        });
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      // Set submitting state back to false
      dispatch({
        type: MINI_NOTES_ACTION.SET_SUBMITTING,
        payload: false
      });
    }
  }, [state.miniNotes.value, state.miniNotes.ui.isSubmitting, dispatch, fetchData]);
  
  return (
    <button
      onClick={handleSubmit}
      disabled={state.miniNotes.ui.isSubmitting}
      className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
    >
      {state.miniNotes.ui.isSubmitting ? "Saving..." : "Take note"}
    </button>
  );
}
