import { ACTION, Action, State } from "./types";

  // Initial state
  export const initialCardState: State = {
    replyingTo: null,
    replyText: "",
    isSubmitting: false,
    expandedNotes: {},
  };
  
  // Reducer function
  export function miniNotesCardReducer(state: State, action: Action): State {
    switch (action.type) {
      case ACTION.SET_REPLYING_TO:
        // If we're toggling the same note off, reset everything
        if (state.replyingTo === action.payload) {
          return {
            ...state,
            replyingTo: null,
            replyText: "",
          };
        }
        // If we're switching to a new note, keep text if there's any
        return {
          ...state,
          replyingTo: action.payload,
          // Only reset text if we're opening a new reply form
          replyText: state.replyText && state.replyingTo === null ? state.replyText : "",
        };
      
      case ACTION.SET_REPLY_TEXT:
        return {
          ...state,
          replyText: action.payload,
        };
      
      case ACTION.TOGGLE_REPLIES:
        const noteId = action.payload;
        return {
          ...state,
          expandedNotes: {
            ...state.expandedNotes,
            [noteId]: !state.expandedNotes[noteId],
          },
        };
      
      case ACTION.SET_SUBMITTING:
        return {
          ...state,
          isSubmitting: action.payload,
        };
      
      case ACTION.RESET_REPLY:
        return {
          ...state,
          replyingTo: null,
          replyText: "",
        };
      
      default:
        return state;
    }
  } 