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
      default:
        return state;
    }
  }
  