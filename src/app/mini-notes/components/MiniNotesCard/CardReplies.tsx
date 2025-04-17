import React, { useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";
import { useRefs } from "./hooks/useRefs";
import { CARD_ACTION, MINI_NOTES_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";
import useFetch from "@/hooks/useFetch";

interface CardRepliesProps {
  note: Note;
}

const CardReplies: React.FC<CardRepliesProps> = ({ note }) => {
  const { state, dispatch } = useMiniNotesContext();
  const { fetchData } = useFetch();
  const { expandedNotes } = state.card;

  const { setters, refs } = useRefs();

  const isExpanded = expandedNotes[note.id];

  const toggleReplies = useCallback(() => {
    if (!dispatch) return;
    
    dispatch({
      type: CARD_ACTION.TOGGLE_REPLIES,
      payload: note.id
    });
  }, [dispatch, note.id]);
  
  const handleDeleteReply = useCallback(async (replyId: number) => {
    if (!dispatch) return;
    
    try {
      // Call the API to delete the reply
      await fetchData(`/api/notes/${replyId}`, "DELETE");
      
      // Update the state to remove the deleted reply
      dispatch({
        type: MINI_NOTES_ACTION.DELETE_NOTE,
        payload: replyId
      });
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  }, [dispatch, fetchData]);

  // Update UI based on expandedNotes state
  useEffect(() => {
    const repliesContainer = refs.repliesRefs[note.id];
    const buttonText = refs.buttonTextRefs[note.id];

    if (repliesContainer) {
      if (isExpanded) {
        repliesContainer.style.display = 'block';
        repliesContainer.style.maxHeight = '1000px'; // Large enough value
      } else {
        repliesContainer.style.display = 'none';
        repliesContainer.style.maxHeight = '0';
      }
    }

    if (buttonText) {
      const repliesCount = note.replies.length;
      buttonText.textContent = isExpanded
        ? `Hide ${repliesCount} ${repliesCount === 1 ? 'reply' : 'replies'}`
        : `Show ${repliesCount} ${repliesCount === 1 ? 'reply' : 'replies'}`;
    }
  }, [isExpanded, note.replies.length, note.id, refs.repliesRefs, refs.buttonTextRefs]);

  // Memoize replies rendering to prevent unnecessary re-renders
  const repliesContent = useMemo(() => {
    return note.replies && note.replies.map((reply: Note) => (
      <div key={reply.id} className="ml-2 my-2 pl-3 border-zinc-500 border-l relative">
        <div className="flex">
          <div className="flex-grow relative">
            {/* Delete button for reply */}
            <button
              onClick={() => handleDeleteReply(reply.id)}
              className="absolute top-0 right-0 flex items-center group cursor-pointer text-gray-500 hover:text-red-500"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-3 group-hover:text-red-500"
              />
            </button>
            
            <p className="text-white text-sm mt-1 whitespace-pre-wrap break-words pr-6">
              {reply.text}
            </p>
            <div className="flex space-x-8 mt-1 action-icons text-xs"></div>
          </div>
        </div>

        {/* Circle at the bottom of the border */}
        <div className="absolute left-[-0.27rem] bottom-[-0.5rem] w-2 h-2 border border-zinc-500 rounded-full bg-black"></div>
      </div>
    ));
  }, [note.replies, handleDeleteReply]);

  return (
    <>
      <button
        onClick={toggleReplies}
        className="text-sm text-gray-500 hover:text-blue-400 mt-2 flex items-center"
      >
        <span
          ref={setters.setButtonTextRef(note.id)}
          className="mr-1"
        >
          Show {note.replies.length} {note.replies.length === 1 ? 'reply' : 'replies'}
        </span>
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="w-3"
        />
      </button>

      <div
        ref={setters.setRepliesRef(note.id)}
        className="mt-2 transition-all overflow-hidden"
        style={{ display: 'none', maxHeight: '0' }}
      >
        {repliesContent}
      </div>
    </>
  );
};

export const MemoizedCardReplies = React.memo(CardReplies);
export { MemoizedCardReplies as CardReplies }; 