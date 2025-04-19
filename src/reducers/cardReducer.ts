import { CARD_ACTION, CardAction } from "@/types/action";
import { CardState } from "@/types/state";

  // Initial state
  export const initialCardState: CardState = {
    replyingTo: null,
    replyText: "",
    isSubmitting: false,
    expandedNotes: {},
    editingNoteId: null,
    editText: "",
    activeMenuId: null
  };
  
  // Reducer function
  export function cardReducer(state: CardState, action: CardAction): CardState {
    switch (action.type) {
      case CARD_ACTION.SET_REPLYING_TO:
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
      
      case CARD_ACTION.SET_REPLY_TEXT:
        return {
          ...state,
          replyText: action.payload,
        };
      
      case CARD_ACTION.TOGGLE_REPLIES:
        const noteId = action.payload;
        return {
          ...state,
          expandedNotes: {
            ...state.expandedNotes,
            [noteId]: !state.expandedNotes[noteId],
          },
        };
      
      case CARD_ACTION.SET_SUBMITTING_REPLY:
        return {
          ...state,
          isSubmitting: action.payload,
        };
      
      case CARD_ACTION.RESET_REPLY:
        return {
          ...state,
          replyingTo: null,
          replyText: "",
        };
      
      case CARD_ACTION.SET_EDITING_NOTE:
        // If we're toggling the same note off, reset everything
        if (state.editingNoteId === action.payload.noteId) {
          return {
            ...state,
            editingNoteId: null,
            editText: "",
          };
        }
        // If we're switching to a new note, set the edit text to the current note text
        return {
          ...state,
          editingNoteId: action.payload.noteId,
          editText: action.payload.text,
        };
      
      case CARD_ACTION.SET_EDIT_TEXT:
        return {
          ...state,
          editText: action.payload,
        };
      
      case CARD_ACTION.RESET_EDIT:
        return {
          ...state,
          editingNoteId: null,
          editText: "",
        };
      
      case CARD_ACTION.TOGGLE_MENU:
        return {
          ...state,
          // If clicking the same menu button, toggle it off
          activeMenuId: state.activeMenuId === action.payload ? null : action.payload
        };
      
      default:
        return state;
    }
  }