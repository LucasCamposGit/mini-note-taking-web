// Action types
export enum CARD_ACTION {
  SET_REPLYING_TO = "set_replying_to",
  SET_REPLY_TEXT = "set_reply_text",
  TOGGLE_REPLIES = "toggle_replies",
  SET_SUBMITTING = "set_submitting",
  RESET_REPLY = "reset_reply",
}

// Action interface
export interface CardAction {
  type: CARD_ACTION;
  payload?: any;
}

// State interface
export interface CardState {
  replyingTo: number | null;
  replyText: string;
  isSubmitting: boolean;
  expandedNotes: { [key: number]: boolean };
}

// Initial state
export const initialCardState: CardState = {
  replyingTo: null,
  replyText: "",
  isSubmitting: false,
  expandedNotes: {},
};

// Reducer function
export function miniNotesCardReducer(state: CardState, action: CardAction): CardState {
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
    
    case CARD_ACTION.SET_SUBMITTING:
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
    
    default:
      return state;
  }
} 