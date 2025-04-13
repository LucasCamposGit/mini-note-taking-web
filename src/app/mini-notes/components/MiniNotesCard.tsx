import { useContext, useRef, useState, useEffect } from "react";
import MiniNotesContext from "./MiniNotesContext";
import { Note, ACTION, Action } from "../page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import useFetch from "@/hooks/useFetch";
import { Dispatch } from "react";

interface MiniNotesCardProps {
  children?: React.ReactNode;
  dispatch: Dispatch<Action>;
}

export default function MiniNotesCard({ dispatch }: MiniNotesCardProps) {
  const state = useContext(MiniNotesContext);
  const { fetchData } = useFetch();
  const [expandedNotes, setExpandedNotes] = useState<{ [key: number]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const repliesRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const buttonTextRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyInputRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({});
  const replyButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const replyStatusRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const escInstructionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  if (!state) return null;

  const toggleReplies = (noteId: number) => {
    setExpandedNotes(prev => {
      const newState = { ...prev };
      newState[noteId] = !prev[noteId];
      return newState;
    });
  };

  const toggleReplyForm = (noteId: number | null) => {
    setReplyingTo(noteId);
    setReplyText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, noteId: number) => {
    // Handle Escape key to cancel reply
    if (e.key === 'Escape') {
      e.preventDefault();
      toggleReplyForm(null);
    }

    // Handle Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (replyText.trim()) {
        submitReply(noteId);
      }
    }
  };

  const submitReply = async (parentId: number) => {
    if (!replyText.trim()) return;

    const statusRef = replyStatusRefs.current[parentId];
    const buttonRef = replyButtonRefs.current[parentId];
    const repliesContainer = repliesRefs.current[parentId];

    if (buttonRef) {
      buttonRef.disabled = true;
      buttonRef.textContent = "Submitting...";
    }

    setIsSubmitting(true);

    try {
      const response = await fetchData("/api/notes", "POST", {
        text: replyText,
        parent_id: parentId
      });

      // Add the new reply to the state
      if (response) {
        dispatch({
          type: ACTION.ADD_REPLY,
          payload: response
        });

        // Immediately hide the reply form
        setReplyingTo(null);
        setReplyText("");

        // Make sure replies are expanded and visible for this note
        setExpandedNotes(prev => ({
          ...prev,
          [parentId]: true
        }));

        // Show replies container immediately
        if (repliesContainer) {
          repliesContainer.style.display = 'block';
          repliesContainer.style.maxHeight = '1000px'; // Large enough value

          // Update button text
          const buttonText = buttonTextRefs.current[parentId];
          if (buttonText) {
            const note = state?.notes?.find((n: Note) => n.id === parentId);
            const currentRepliesCount = note?.replies?.length || 0;
            const newRepliesCount = currentRepliesCount + 1; // +1 for the reply we just added
            buttonText.textContent = `Hide ${newRepliesCount} replies`;
          }
        }
      }

    } catch (error) {
      if (statusRef) {
        statusRef.textContent = "Failed to submit reply. Please try again.";
        statusRef.className = "text-red-500 text-xs mt-1";
        statusRef.style.opacity = "1";

        // Hide error message after a delay
        setTimeout(() => {
          if (statusRef) {
            statusRef.style.opacity = "0";
          }
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
      if (buttonRef) {
        buttonRef.disabled = false;
        buttonRef.textContent = "Submit";
      }
    }
  };

  const setButtonTextRef = (noteId: number) => (element: HTMLSpanElement | null) => {
    buttonTextRefs.current[noteId] = element;
  };

  const setRepliesRef = (noteId: number) => (element: HTMLDivElement | null) => {
    repliesRefs.current[noteId] = element;
  };

  const setReplyFormRef = (noteId: number) => (element: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = element;
  };

  const setReplyInputRef = (noteId: number) => (element: HTMLTextAreaElement | null) => {
    replyInputRefs.current[noteId] = element;
  };

  const setReplyButtonRef = (noteId: number) => (element: HTMLButtonElement | null) => {
    replyButtonRefs.current[noteId] = element;
  };

  const setReplyStatusRef = (noteId: number) => (element: HTMLDivElement | null) => {
    replyStatusRefs.current[noteId] = element;
  };

  const setEscInstructionRef = (noteId: number) => (element: HTMLDivElement | null) => {
    escInstructionRefs.current[noteId] = element;
  };

  // Reinstate and fix the useEffect for expandedNotes
  useEffect(() => {
    if (!state?.notes) return;

    // Process all notes to update UI based on expandedNotes state
    state.notes.forEach((note) => {
      if (!note.replies?.length) return;

      const noteId = note.id;
      const repliesContainer = repliesRefs.current[noteId];
      const buttonText = buttonTextRefs.current[noteId];
      const isExpanded = expandedNotes[noteId];

      if (repliesContainer) {
        if (isExpanded) {
          repliesContainer.style.display = 'block';
          repliesContainer.style.maxHeight = '1000px'; // Large enough value for all content
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
    });
  }, [expandedNotes, state?.notes]);

  // Add a smaller useEffect to ensure refs are properly set and clean when data changes
  useEffect(() => {
    // Clean up stale refs when notes data changes
    repliesRefs.current = {};
    buttonTextRefs.current = {};
  }, [state?.notes]);

  // Effect to handle reply form visibility
  useEffect(() => {
    // Hide all reply forms first
    Object.keys(replyFormRefs.current).forEach((noteIdStr) => {
      const noteId = parseInt(noteIdStr);
      const formRef = replyFormRefs.current[noteId];
      const escInstructionRef = escInstructionRefs.current[noteId];

      if (formRef) {
        if (replyingTo === noteId) {
          formRef.style.display = 'block';
          formRef.style.opacity = '1';

          // Show ESC instruction
          if (escInstructionRef) {
            escInstructionRef.style.opacity = '1';
          }

          // Focus the textarea
          const inputRef = replyInputRefs.current[noteId];
          if (inputRef) {
            inputRef.focus();
          }
        } else {
          formRef.style.display = 'none';
          formRef.style.opacity = '0';

          // Hide ESC instruction
          if (escInstructionRef) {
            escInstructionRef.style.opacity = '0';
          }
        }
      }
    });
  }, [replyingTo]);

  // Effect to update textarea value
  useEffect(() => {
    if (replyingTo !== null) {
      const inputRef = replyInputRefs.current[replyingTo];
      if (inputRef) {
        inputRef.value = replyText;
      }
    }
  }, [replyText, replyingTo]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && replyingTo !== null) {
        toggleReplyForm(null);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [replyingTo]);

  return state.notes?.map((note: Note) => (
    <div key={note.id} className="note-card p-4 my-2 rounded-xl">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex-grow">
            <p className="text-white mt-1 mb-2">{note.text}</p>
            <div className="flex justify-between items-center max-w-xs action-icons text-sm">
              <div className="flex items-center space-x-4">
                {/* Reply button */}
                <button
                  onClick={() => toggleReplyForm(replyingTo === note.id ? null : note.id)}
                  className="flex items-center group cursor-pointer text-gray-500 hover:text-blue-400"
                >
                  <FontAwesomeIcon
                    icon={["far", "comment"]}
                    className="mr-2 w-3 group-hover:text-blue-400"
                  />
                  <span className="group-hover:text-blue-400">Reply</span>
                </button>
              </div>
            </div>

            <div
              ref={setReplyFormRef(note.id)}
              className="mt-3 transition-opacity duration-300 opacity-0"
              style={{ display: 'none' }}
            >
              <textarea
                ref={setReplyInputRef(note.id)}
                placeholder="Write a reply..."
                className="w-full bg-transparent border border-zinc-800 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
                maxLength={280}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, note.id)}
              ></textarea>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <div ref={setReplyStatusRef(note.id)} className="transition-opacity duration-300 opacity-0 mr-3"></div>
                  <div className="text-xs text-gray-500">{replyText.length} / 280</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div 
                    ref={setEscInstructionRef(note.id)}
                    className="text-xs text-zinc-500 opacity-0 transition-opacity duration-300"
                  >
                    Press <kbd className="px-1 py-0.5 bg-zinc-800 rounded">ESC</kbd> to cancel
                  </div>
                  <button
                    ref={setReplyButtonRef(note.id)}
                    onClick={() => submitReply(note.id)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    disabled={isSubmitting || !replyText.trim()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {note.replies?.length > 0 && (
              <button
                onClick={() => toggleReplies(note.id)}
                className="text-sm text-gray-500 hover:text-blue-400 mt-2 flex items-center"
              >
                <span
                  ref={setButtonTextRef(note.id)}
                  className="mr-1"
                >
                  Show {note.replies.length} {note.replies.length === 1 ? 'reply' : 'replies'}
                </span>
                <FontAwesomeIcon
                  icon={expandedNotes[note.id] ? faChevronUp : faChevronDown}
                  className="w-3"
                />
              </button>
            )}
          </div>
        </div>

        <div
          ref={setRepliesRef(note.id)}
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
      </div>
    </div>
  ))
}


