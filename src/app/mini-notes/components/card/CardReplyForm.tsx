"use client";

import { useState, useEffect, useRef } from "react";
import { UI_ACTION, NOTES_ACTION } from "@/types/action";
import useFetch from "@/hooks/useFetch";
import { Note } from "@/types/note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useMiniNotesPageDispatch, useMiniNotesPageState } from "@/context/MiniNotesPageContext";

interface CardReplyFormProps {
  noteId: number;
}

export default function CardReplyForm({ noteId }: CardReplyFormProps) {
  const dispatch = useMiniNotesPageDispatch();
  const state = useMiniNotesPageState();

  const { fetchData } = useFetch();
  const [charCount, setCharCount] = useState(0);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  // Get the current reply text from the card state
  const replyText = state.ui.noteCard.replyText || "";
  const isSubmitting = state.notes.pendingOperations.isSubmitting;

  // Update character count when reply text changes
  useEffect(() => {
    setCharCount(replyText.length);
  }, [replyText]);

  // Update button text when submitting state changes
  useEffect(() => {
    if (buttonTextRef.current) {
      buttonTextRef.current.textContent = isSubmitting ? "Sending..." : "Reply";
    }
  }, [isSubmitting]);

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: UI_ACTION.UPDATE_REPLY_TEXT,
      payload: e.target.value
    });
  };

  // Handle reply submission
  const handleSubmit = async () => {
    if (!replyText.trim() || isSubmitting) {
      return;
    }

    // Set submitting state
    dispatch({
      type: NOTES_ACTION.CREATE_REPLY_REQUEST,
      payload: { parentId: noteId }
    });

    try {
      // Call API to post the reply
      const response = await fetchData("/api/notes", "POST", {
        text: replyText.trim(),
        parent_id: noteId
      });

      // If successful, add the reply to the state
      if (response) {
        dispatch({
          type: NOTES_ACTION.CREATE_REPLY_SUCCESS,
          payload: response as Note
        });

        // Reset the reply form
        dispatch({
          type: UI_ACTION.CANCEL_REPLY
        });
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
      dispatch({
        type: NOTES_ACTION.CREATE_REPLY_FAILURE,
        payload: "Failed to submit reply"
      });
    }
  };

  // Handle cancel reply
  const handleCancel = () => {
    dispatch({
      type: UI_ACTION.CANCEL_REPLY
    });
  };

  // Get the character limit based on user's plan
  const charLimit = 280; // This should be dynamically determined based on user's plan

  return (
    <div className="mt-2 mb-2 bg-gray-700/50 rounded-lg p-3">
      <div className="relative">
        <textarea
          value={replyText}
          onChange={handleChange}
          placeholder="Write a reply..."
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
              disabled={!replyText.trim() || isSubmitting || charCount > charLimit}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-sm
                flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span ref={buttonTextRef}>Reply</span>
              <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}