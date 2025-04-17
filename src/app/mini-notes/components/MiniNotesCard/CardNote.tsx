import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";
import { CARD_ACTION, MINI_NOTES_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";
import useFetch from "@/hooks/useFetch";

interface MiniNotesCardNoteProps {
  note: Note;
}

const CardNote: React.FC<MiniNotesCardNoteProps> = ({ note }) => {
  const { state, dispatch } = useMiniNotesContext();
  const { fetchData } = useFetch();
  const replyingTo = state.card.replyingTo;

  const toggleReplyForm = useCallback(() => {
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
  }, [dispatch, replyingTo, note.id]);

  const handleDeleteNote = useCallback(async () => {
    if (!dispatch) return;
    
    try {
      // Call the API to delete the note
      await fetchData(`/api/notes/${note.id}`, "DELETE");
      
      // Update the state to remove the deleted note
      dispatch({
        type: MINI_NOTES_ACTION.DELETE_NOTE,
        payload: note.id
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }, [dispatch, fetchData, note.id]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative">
        {/* Delete button at top right */}
        <button
          onClick={handleDeleteNote}
          className="absolute top-0 right-0 flex items-center group cursor-pointer text-gray-500 hover:text-red-500"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="w-3 group-hover:text-red-500"
          />
        </button>

        <div className="flex-grow">
          <p className="text-white mt-1 mb-2 pr-6">{note.text}</p>
          <div className="flex items-center action-icons text-sm">
            {/* Reply button */}
            <button
              onClick={toggleReplyForm}
              className="flex items-center group cursor-pointer text-gray-500 hover:text-blue-400"
            >
              <FontAwesomeIcon
                icon={faComment}
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
  );
};

export const MemoizedCardNote = React.memo(CardNote);
export { MemoizedCardNote as CardNote }; 