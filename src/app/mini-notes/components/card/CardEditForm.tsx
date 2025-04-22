"use client";

import { useState, useEffect, useRef } from "react";
import { NOTES_ACTION, UI_ACTION } from "@/types/action";
import useFetch from "@/hooks/useFetch";
import { Note } from "@/types/note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { useMiniNotesPageDispatch, useMiniNotesPageState } from "../../context";

interface CardEditFormProps {
  noteId: number;
  initialText: string;
}

export default function CardEditForm({ noteId, initialText }: CardEditFormProps) {
  const dispatch = useMiniNotesPageDispatch();
  const state = useMiniNotesPageState();
  const { fetchData } = useFetch();
  const [charCount, setCharCount] = useState(0);
  const [editText, setEditText] = useState(initialText);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  const isSubmitting = state.notes.pendingOperations.isSubmitting;

  // Update character count when edit text changes
  useEffect(() => {
    setCharCount(editText.length);
  }, [editText]);

  // Update button text when submitting state changes
  useEffect(() => {
    if (buttonTextRef.current) {
      buttonTextRef.current.textContent = isSubmitting ? "Saving..." : "Save";
    }
  }, [isSubmitting]);

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
    dispatch({
      type: UI_ACTION.UPDATE_EDIT_TEXT,
      payload: e.target.value
    });
  };

  // Handle edit submission
  const handleSubmit = async () => {
    if (!editText.trim() || isSubmitting) {
      return;
    }

    // Set submitting state
    dispatch({
      type: NOTES_ACTION.UPDATE_NOTE_REQUEST,
      payload: { id: noteId }
    });

    try {
      // Call API to update the note
      const response = await fetchData(`/api/notes/${noteId}`, "PATCH", {
        text: editText.trim()
      });

      // If successful, update the note in state
      if (response) {
        dispatch({
          type: NOTES_ACTION.UPDATE_NOTE_SUCCESS,
          payload: response as Note
        });

        // Reset the edit form
        dispatch({
          type: UI_ACTION.CANCEL_EDIT
        });
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      // Reset submitting state
      dispatch({
        type: NOTES_ACTION.UPDATE_NOTE_FAILURE,
        payload: "Failed to update note"
      });
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    dispatch({
      type: UI_ACTION.CANCEL_EDIT
    });
  };

  // Get the character limit based on user's plan
  const charLimit = 280; // This should be dynamically determined based on user's plan

  return (
    <div className="mt-2 mb-2 bg-gray-700/50 rounded-lg p-3">
      <div className="relative">
        <textarea
          value={editText}
          onChange={handleChange}
          placeholder="Edit your note..."
          maxLength={charLimit}
          className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white 
            text-sm focus:ring-blue-500 focus:border-blue-500 block resize-none min-h-[80px]"
        />
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs ${charCount > charLimit * 0.8 ? 'text-orange-400' : 'text-gray-400'}`}>
            {charCount}/{charLimit}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="p-2 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!editText.trim() || isSubmitting || charCount > charLimit}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-sm
                flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span ref={buttonTextRef}>Save</span>
              <FontAwesomeIcon icon={faSave} className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}