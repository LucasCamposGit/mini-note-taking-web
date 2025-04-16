import { NoteAction, ACTION, State } from "../types";

/**
 * Reducer function to manage the state of the application.
 *
 * @param {State} state - The current state of the application.
 * @param {NoteAction} action - The action to be processed.
 * @returns {State} The new state after the action is applied.
 */
export function reducer(state: State, action: NoteAction): State {
    switch (action.type) {
      case ACTION.LOAD_DATA:
        return {
          ...state,
          notes: action.payload,
        };
      case ACTION.TYPING:
        return {
          ...state,
          value: action.payload,
        };
      case ACTION.SUBMIT_NOTE:
        return {
          ...state,
          value: "",
        };
      case ACTION.ADD_NOTE:
        return {
          ...state,
          notes: [action.payload, ...(state.notes || [])],
        }
      case ACTION.ADD_REPLY: 
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
      case ACTION.SET_EDITING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isEditing: action.payload
          }
        }
      case ACTION.SET_REPLYING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isReplying: action.payload
          }
        }
      case ACTION.SET_ACTIVE_NOTE:
        return {
          ...state,
          ui: {
            ...state.ui,
            activeNoteId: action.payload
          }
        }
      case ACTION.SET_SUBMITTING:
        return {
          ...state,
          ui: {
            ...state.ui,
            isSubmitting: action.payload
          }
        }
      default:
        return state;
    }
  }
  