import React, { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";
import { useRefs } from "./hooks/useRefs";
import { CARD_ACTION, MINI_NOTES_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";
import useFetch from "@/hooks/useFetch";
import Card from "./Card";
import CardMenu from "./CardMenu";

interface CardRepliesProps {
  note: Note;
  menu?: React.ReactNode;
}

const CardReplies: React.FC<CardRepliesProps> = ({ note, menu }) => {
  const { state, dispatch } = useMiniNotesContext();
  const { fetchData } = useFetch();
  const { expandedNotes, editingNoteId, editText } = state.card;

  const { setters, refs } = useRefs();

  const isExpanded = expandedNotes[note.id];

  const toggleReplies = () => {

    dispatch({
      type: CARD_ACTION.TOGGLE_REPLIES,
      payload: note.id
    });
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    dispatch({
      type: CARD_ACTION.SET_EDIT_TEXT,
      payload: e.target.value
    });
  };

  const handleUpdateReply = async (replyId: number) => {
    if (!editText.trim()) return;

    try {
      // Call the API to update the reply
      const updatedReply = await fetchData(`/api/notes/${replyId}`, "PATCH", { text: editText });
      
      if (updatedReply) {
        // Update the state with the updated reply
        dispatch({
          type: MINI_NOTES_ACTION.UPDATE_NOTE,
          payload: updatedReply
        });
  
        // Reset the edit state
        dispatch({
          type: CARD_ACTION.RESET_EDIT
        });
      }
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, replyId: number) => {
    
    // Handle Escape key to cancel edit
    if (e.key === 'Escape') {
      e.preventDefault();
      dispatch({
        type: CARD_ACTION.RESET_EDIT
      });
    }

    // Handle Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (editText.trim()) {
        handleUpdateReply(replyId);
      }
    }
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
        {(note.replies && note.replies.map((reply: Note) => (
          <div key={reply.id} className="ml-2 my-2 pl-3 bg-gray-900 rounded border-zinc-500 border-l relative">
            <div className="flex">
              <div className="flex-grow relative">
                <div className="absolute top-1 right-1">
                  <CardMenu note={reply} />
                </div>
                {editingNoteId !== reply.id ? (
                  <>
                    <p className="text-white text-sm mt-1 whitespace-pre-wrap break-words pr-6">
                      {reply.text}
                    </p>
                  </>
                ) : (
                  <div className="mt-2 pr-4">
                    <textarea
                      value={editText}
                      onChange={handleEditTextChange}
                      onKeyDown={(e) => handleKeyDown(e, reply.id)}
                      placeholder="Edit your reply..."
                      className="w-full bg-transparent border border-zinc-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={2}
                      maxLength={280}
                    />
                    <div className="flex justify-between mt-2">
                      <div className="text-xs text-gray-500">{editText.length} / 280</div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            if (dispatch) {
                              dispatch({ type: CARD_ACTION.RESET_EDIT });
                            }
                          }}
                          className="px-2 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateReply(reply.id)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-500"
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

            {/* Circle at the bottom of the border */}
            <div className="absolute left-[-0.27rem] bottom-[-0.5rem] w-2 h-2 border border-zinc-500 rounded-full bg-black"></div>
          </div>
        )))}
      </div>
    </>
  );
};

export const MemoizedCardReplies = React.memo(CardReplies);
export { MemoizedCardReplies as CardReplies }; 