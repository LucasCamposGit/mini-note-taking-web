import { MINI_NOTES_ACTION, MiniNotesAction } from "@/types/action";
import { MiniNotesState } from "@/types/state";
import { Note } from "@/types/note";

export const initialMiniNotesState: MiniNotesState = {
  notes: null,
  value: "",
  ui: {
    isEditing: false,
    isReplying: false,
    activeNoteId: null,
    isSubmitting: false
  }
};


export function miniNotesReducer(state: MiniNotesState, action: MiniNotesAction): MiniNotesState {
    switch (action.type) {
      case MINI_NOTES_ACTION.LOAD_DATA:
        return {
          ...state,
          notes: action.payload,
        };
      case MINI_NOTES_ACTION.TYPING:
        return {
          ...state,
          value: action.payload,
        };
      case MINI_NOTES_ACTION.SUBMIT_NOTE:
        return {
          ...state,
          value: "",
        };
      case MINI_NOTES_ACTION.ADD_NOTE:
        return {
          ...state,
          notes: [action.payload, ...(state.notes || [])],
        }
      case MINI_NOTES_ACTION.ADD_REPLY: 
        return {
          ...state,
          notes: state.notes ? state.notes.map(note => 
            note.id === action.payload.parent_id 
              ? { 
                  ...note, 
                  replies: [...(note.replies || []), action.payload] 
                } 
              : note
          ) : []
        }
      case MINI_NOTES_ACTION.SET_EDITING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isEditing: action.payload
          }
        }
      case MINI_NOTES_ACTION.SET_REPLYING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isReplying: action.payload
          }
        }
      case MINI_NOTES_ACTION.SET_ACTIVE_NOTE:
        return {
          ...state,
          ui: {
            ...state.ui,
            activeNoteId: action.payload
          }
        }
      case MINI_NOTES_ACTION.SET_SUBMITTING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isSubmitting: action.payload
          }
        }
  
      case MINI_NOTES_ACTION.DELETE_NOTE:
        return {
          ...state,
          notes: state.notes ? state.notes.map(note => {
            if (note.id === action.payload) {
              return null;
            }
            
            if (note.replies && note.replies.length > 0) {
              const updatedReplies = note.replies.filter(reply => reply.id !== action.payload);
              if (updatedReplies.length !== note.replies.length) {
                return {
                  ...note,
                  replies: updatedReplies
                };
              }
            }
            
            return note;
          }).filter(Boolean) as Note[] : []
        }
      case MINI_NOTES_ACTION.UPDATE_NOTE:
        return {
          ...state,
          notes: state.notes ? state.notes.map(note => {
            // If this is the note we're updating
            if (note.id === action.payload.id) {
              return {
                ...note,
                text: action.payload.text
              };
            }
            
            // Check if this note has replies that need updating
            if (note.replies && note.replies.length > 0) {
              const updatedReplies = note.replies.map(reply => 
                reply.id === action.payload.id
                  ? { ...reply, text: action.payload.text }
                  : reply
              );
              
              // If a reply was updated, return the updated note
              if (JSON.stringify(updatedReplies) !== JSON.stringify(note.replies)) {
                return {
                  ...note,
                  replies: updatedReplies
                };
              }
            }
            
            // Otherwise return the original note
            return note;
          }) : []
        }
      default:
        return state;
    }
  }
  