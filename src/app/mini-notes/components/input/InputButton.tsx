"use client";

import { NOTES_ACTION } from "@/types/action";
import useFetch from "@/hooks/useFetch";
import { useCallback } from "react";
import { Note } from "@/types/note";
import { useMiniNotesPageDispatch, useMiniNotesPageState } from "../../context";

interface InputButtonProps {
  onSubmitAction?: () => void;
}

export default function InputButton({ onSubmitAction }: InputButtonProps) {
  const { fetchData } = useFetch();
  const dispatch = useMiniNotesPageDispatch();
  const state = useMiniNotesPageState();
  
  const handleSubmit = useCallback(async () => {
    // Don't submit if empty or already submitting
    if (!state.notes.currentNote.text.trim() || state.notes.pendingOperations.isSubmitting) {
      return;
    }
    
    // Set submitting state to true
    dispatch({
      type: NOTES_ACTION.CREATE_NOTE_REQUEST
    });
    
    try {
      // Call API to create a new note
      const response = await fetchData("/api/notes", "POST", {
        text: state.notes.currentNote.text
      });
      
      // Add the new note to the state
      if (response) {
        dispatch({
          type: NOTES_ACTION.CREATE_NOTE_SUCCESS,
          payload: response as Note
        });
        
        // Clear the input
        dispatch({
          type: NOTES_ACTION.RESET_CURRENT_NOTE
        });
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      dispatch({
        type: NOTES_ACTION.CREATE_NOTE_FAILURE,
        payload: "Failed to create note"
      });
    }
  }, [state.notes.currentNote.text, state.notes.pendingOperations.isSubmitting, dispatch, fetchData]);
  
  return (
    <button
      onClick={handleSubmit}
      disabled={state.notes.pendingOperations.isSubmitting}
      className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50"
    >
      {state.notes.pendingOperations.isSubmitting ? "Saving..." : "Take note"}
    </button>
  );
}
