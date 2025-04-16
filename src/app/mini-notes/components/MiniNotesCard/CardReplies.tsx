import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";
import { useRefs } from "./hooks/useRefs";
import { CARD_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";

interface CardRepliesProps {
  note: Note;
}

export const CardReplies: React.FC<CardRepliesProps> = ({ note }) => {

  const { state, dispatch } = useMiniNotesContext();
  const { expandedNotes } = state.card;

  const { setters, refs } = useRefs();

  const isExpanded = expandedNotes[note.id];

  if (!note.replies || note.replies.length == 0) return null;

  const toggleReplies = () => {
    if (!dispatch) return;

    dispatch({
      type: CARD_ACTION.TOGGLE_REPLIES,
      payload: note.id
    });
  };



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
        {note.replies && note.replies.map((reply: Note) => (
          <div key={reply.id} className="ml-2 my-2 pl-3 border-zinc-500 border-l relative">
            <div className="flex">
              <div className="flex-grow">
                <p className="text-white text-sm mt-1 whitespace-pre-wrap break-words">
                  {reply.text}
                </p>
                <div className="flex space-x-8 mt-1 action-icons text-xs"></div>
              </div>
            </div>

            {/* Circle at the bottom of the border */}
            <div className="absolute left-[-0.27rem] bottom-[-0.5rem] w-2 h-2 border border-zinc-500 rounded-full bg-black"></div>
          </div>
        ))}
      </div>
    </>
  );
}; 