"use client";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UI_ACTION } from "@/types/action";
import useDispatch from "../../context/DispatchContext";
import useUI from "../../context/UIContext";
import useNotes from "../../context/NotesContext";

interface CardRepliesToggleBtnProps {
  noteId: number;
}

export default function CardRepliesToggleBtn({ noteId }: CardRepliesToggleBtnProps) {
  const dispatch = useDispatch();
  const ui = useUI();
  const notes = useNotes();

  const note = notes.items?.find((note) => note.id === noteId);

  const replyCount = note?.replies?.length || 0;

  
  // Check if this card is expanded in the UI state
  const isExpanded = ui.noteCard.expandedCards[noteId] || false;
  
  const toggleReplies = () => {
    dispatch({
      type: UI_ACTION.TOGGLE_CARD_EXPANDED,
      payload: noteId
    });
  };

  // Don't render the toggle button if there are no replies
  if (replyCount === 0) return null;


  return (
    <button
      onClick={toggleReplies}
      className="text-sm text-gray-500 hover:text-blue-400 mt-2 flex items-center"
    >
      <FontAwesomeIcon 
        icon={isExpanded ? faChevronUp : faChevronDown} 
        className="mr-1.5 w-3 h-3" 
      />
      <span>
        {isExpanded ? "Hide" : "Show"} {replyCount} {replyCount === 1 ? "reply" : "replies"}
      </span>
    </button>
  );
}
