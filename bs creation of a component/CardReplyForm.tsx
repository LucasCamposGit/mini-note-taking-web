import React, { useCallback, useEffect } from "react";
import { useMiniNotesCard } from "./MiniNotesCardContext";
import { useRefs } from "./hooks/useRefs";
import { CARD_ACTION } from "./MiniNotesCardReducer";
import useFetch from "@/hooks/useFetch";
import { ACTION } from "../../types";

interface MiniNotesCardReplyFormProps {
  noteId: number;
}

export const MiniNotesCardReplyForm: React.FC<MiniNotesCardReplyFormProps> = ({ noteId }) => {
  const { 
    replyingTo, 
    replyText, 
    isSubmitting, 
  } = useMiniNotesCard();
  
  const { setters } = useRefs();
  const { fetchData } = useFetch();

  const setReplyText = (text: string) => {
    cardDispatch({
      type: CARD_ACTION.SET_REPLY_TEXT,
      payload: text
    });
  };

  // Check if this form should be visible
  const isVisible = replyingTo === noteId;

  // Apply visibility styling directly to improve reliability
  useEffect(() => {
    const element = document.getElementById(`reply-form-${noteId}`);
    if (element) {
      if (isVisible) {
        element.style.display = 'block';
        setTimeout(() => {
          element.style.opacity = '1';
        }, 10);
      } else {
        element.style.opacity = '0';
        setTimeout(() => {
          element.style.display = 'none';
        }, 300);
      }
    }
  }, [isVisible, noteId]);

  const submitReply = useCallback(async () => {
    if (!replyText.trim()) return;

    cardDispatch({
      type: CARD_ACTION.SET_SUBMITTING,
      payload: true
    });

    try {
      const response = await fetchData("/api/notes", "POST", {
        text: replyText,
        parent_id: noteId,
      });

      if (response) {
        dispatch({
          type: ACTION.ADD_REPLY,
          payload: response,
        });

        // Reset reply state
        cardDispatch({
          type: CARD_ACTION.SET_REPLYING_TO,
          payload: null
        });
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      cardDispatch({
        type: CARD_ACTION.SET_SUBMITTING,
        payload: false
      });
    }
  }, [replyText, noteId, dispatch, cardDispatch, fetchData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Escape key to cancel reply
    if (e.key === 'Escape') {
      e.preventDefault();
      cardDispatch({
        type: CARD_ACTION.SET_REPLYING_TO,
        payload: null
      });
    }

    // Handle Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (replyText.trim()) {
        submitReply();
      }
    }
  };

  return (
    <div
      id={`reply-form-${noteId}`}
      ref={setters.setReplyFormRef(noteId)}
      className="mt-3 transition-opacity duration-300 opacity-0"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <textarea
        ref={setters.setReplyInputRef(noteId)}
        placeholder="Write a reply..."
        className="w-full bg-transparent border border-zinc-800 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={2}
        maxLength={280}
        onChange={(e) => setReplyText(e.target.value)}
        onKeyDown={handleKeyDown}
        value={replyingTo === noteId ? replyText : ""}
      ></textarea>
      <div className="flex justify-between mt-2">
        <div className="flex items-center">
          <div ref={setters.setReplyStatusRef(noteId)} className="transition-opacity duration-300 opacity-0 mr-3"></div>
          <div className="text-xs text-gray-500">{replyText.length} / 280</div>
        </div>
        <div className="flex items-center space-x-4">
          <div 
            ref={setters.setEscInstructionRef(noteId)}
            className="text-xs text-zinc-500 opacity-0 transition-opacity duration-300"
          >
            Press <kbd className="px-1 py-0.5 bg-zinc-800 rounded">ESC</kbd> to cancel
          </div>
          <button
            ref={setters.setReplyButtonRef(noteId)}
            onClick={submitReply}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            disabled={isSubmitting || !replyText.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}; 