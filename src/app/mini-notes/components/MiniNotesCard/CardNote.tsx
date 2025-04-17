import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
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
  const { editingNoteId, editText } = state.card;
  const isEditing = editingNoteId === note.id;

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

  const toggleEditForm = useCallback(() => {
    if (!dispatch) return;

    // If we're already editing this note, reset it
    if (isEditing) {
      dispatch({
        type: CARD_ACTION.RESET_EDIT
      });
    } else {
      // Otherwise set this note as the one we're editing
      dispatch({
        type: CARD_ACTION.SET_EDITING_NOTE,
        payload: {
          noteId: note.id,
          text: note.text
        }
      });
    }
  }, [dispatch, isEditing, note.id, note.text]);

  const handleEditTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!dispatch) return;
    
    dispatch({
      type: CARD_ACTION.SET_EDIT_TEXT,
      payload: e.target.value
    });
  }, [dispatch]);

  const handleUpdateNote = useCallback(async () => {
    if (!dispatch || !editText.trim()) return;

    try {
      // Call the API to update the note
      const updatedNote = await fetchData(`/api/notes/${note.id}`, "PATCH", { text: editText });
      
      if (updatedNote) {
        // Update the state with the updated note
        dispatch({
          type: MINI_NOTES_ACTION.UPDATE_NOTE,
          payload: updatedNote
        });
  
        // Reset the edit state
        dispatch({
          type: CARD_ACTION.RESET_EDIT
        });
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }, [dispatch, fetchData, note.id, editText]);

  const handleCancelEdit = useCallback(() => {
    if (!dispatch) return;
    dispatch({
      type: CARD_ACTION.RESET_EDIT
    });
  }, [dispatch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!dispatch) return;
    
    // Handle Escape key to cancel edit
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }

    // Handle Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (editText.trim()) {
        handleUpdateNote();
      }
    }
  }, [dispatch, editText, handleCancelEdit, handleUpdateNote]);

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
          className="absolute top-1 right-1 flex items-center group cursor-pointer text-gray-500 hover:text-red-500"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="w-3 group-hover:text-red-500"
          />
        </button>

        {!isEditing ? (
          <div className="flex-grow">
            <p className="text-white mt-1 mb-2 pr-6">{note.text}</p>
            <div className="flex items-center space-x-4 action-icons text-sm">
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

              {/* Edit button */}
              <button
                onClick={toggleEditForm}
                className="flex items-center group cursor-pointer text-gray-500 hover:text-blue-400"
              >
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="mr-2 w-3 group-hover:text-blue-400"
                />
                <span className="group-hover:text-blue-400">
                  Edit
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow mt-2">
            <textarea
              value={editText}
              onChange={handleEditTextChange}
              onKeyDown={handleKeyDown}
              placeholder="Edit your note..."
              className="w-full bg-transparent border border-zinc-800 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={2}
              maxLength={280}
            />
            <div className="flex justify-between mt-2">
              <div className="text-xs text-gray-500">{editText.length} / 280</div>
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateNote}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  disabled={!editText.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const MemoizedCardNote = React.memo(CardNote);
export { MemoizedCardNote as CardNote }; 