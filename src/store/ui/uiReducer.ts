import { UIState, initialUIState } from "@/types/state";
import { UI_ACTION, UIAction } from "@/types/action";

export const uiReducer = (state: UIState = initialUIState, action: UIAction): UIState => {
  switch (action.type) {
    // Editor UI actions
    case UI_ACTION.UPDATE_CHAR_COUNT:
      return {
        ...state,
        noteEditor: {
          ...state.noteEditor,
          characterCount: action.payload
        }
      };
      
    case UI_ACTION.SET_EDITOR_DIRTY:
      return {
        ...state,
        noteEditor: {
          ...state.noteEditor,
          isDirty: action.payload
        }
      };
      
    // Card UI actions
    case UI_ACTION.TOGGLE_CARD_EXPANDED:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          expandedCards: {
            ...state.noteCard.expandedCards,
            [action.payload]: !state.noteCard.expandedCards[action.payload]
          }
        }
      };
      
    case UI_ACTION.SET_ACTIVE_MENU:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          activeMenuId: action.payload
        }
      };
      
    case UI_ACTION.CLOSE_ALL_MENUS:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          activeMenuId: null
        }
      };
      
    // Reply UI actions
    case UI_ACTION.START_REPLY:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          replyingTo: action.payload,
          replyText: '' // Reset reply text when starting a new reply
        }
      };
      
    case UI_ACTION.UPDATE_REPLY_TEXT:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          replyText: action.payload
        }
      };
      
    case UI_ACTION.CANCEL_REPLY:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          replyingTo: null,
          replyText: ''
        }
      };
      
    // Edit UI actions
    case UI_ACTION.START_EDIT:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          editingNoteId: action.payload.noteId,
          editText: action.payload.text
        }
      };
      
    case UI_ACTION.UPDATE_EDIT_TEXT:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          editText: action.payload
        }
      };
      
    case UI_ACTION.CANCEL_EDIT:
      return {
        ...state,
        noteCard: {
          ...state.noteCard,
          editingNoteId: null,
          editText: ''
        }
      };
      
    // Modal UI actions
    case UI_ACTION.OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          type: action.payload.type
        }
      };
      
    case UI_ACTION.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          type: null
        }
      };
      
    default:
      return state;
  }
};