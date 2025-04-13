import { Action, ACTION, State } from "../page";

export function reducer(state: State, action: Action): State {
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
      
      default:
        return state;
    }
  }
  