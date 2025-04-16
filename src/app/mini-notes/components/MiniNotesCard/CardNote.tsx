import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Note } from "@/types/note";
import { CARD_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";

interface MiniNotesCardNoteProps {
  note: Note;
}

export const CardNote: React.FC<MiniNotesCardNoteProps> = ({ note }) => {
  const { state, dispatch } = useMiniNotesContext();
  const replyingTo = state.card.replyingTo;

  const toggleReplyForm = () => {
    if (!dispatch) return;
    
    // If we're already replying to this note, reset it
    if (replyingTo === note.id) {
      dispatch({
        type: CARD_ACTION.RESET_REPLY
      });
    } else {
      // Otherwise set this note as the one we're replying to
      dispatch({
        type: CARD_ACTION.SET_REPLYING_TO,
        payload: note.id
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex-grow">
          <p className="text-white mt-1 mb-2">{note.text}</p>
          <div className="flex justify-between items-center max-w-xs action-icons text-sm">
            <div className="flex items-center space-x-4">
              {/* Reply button */}
              <button
                onClick={toggleReplyForm}
                className="flex items-center group cursor-pointer text-gray-500 hover:text-blue-400"
              >
                <FontAwesomeIcon
                  icon={["far", "comment"]}
                  className="mr-2 w-3 group-hover:text-blue-400"
                />
                <span className={`group-hover:text-blue-400 ${replyingTo === note.id ? 'text-blue-400' : ''}`}>
                  {replyingTo === note.id ? 'Cancel' : 'Reply'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 