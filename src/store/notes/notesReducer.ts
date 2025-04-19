import { NotesState, initialNotesState } from "@/types/state";
import { NOTES_ACTION, NotesAction } from "@/types/action";

export const notesReducer = (state: NotesState = initialNotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    // Data fetching
    case NOTES_ACTION.FETCH_NOTES_REQUEST:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isLoading: true }
      };
      
    case NOTES_ACTION.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        pendingOperations: { ...state.pendingOperations, isLoading: false }
      };
      
    case NOTES_ACTION.FETCH_NOTES_FAILURE:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isLoading: false }
      };
      
    // Note creation
    case NOTES_ACTION.CREATE_NOTE_REQUEST:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: true }
      };
      
    case NOTES_ACTION.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        items: state.items ? [action.payload, ...state.items] : [action.payload],
        pendingOperations: { ...state.pendingOperations, isSubmitting: false },
        currentNote: { id: null, text: '' } // Reset current note after successful creation
      };
      
    case NOTES_ACTION.CREATE_NOTE_FAILURE:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    // Note update
    case NOTES_ACTION.UPDATE_NOTE_REQUEST:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: true }
      };
      
    case NOTES_ACTION.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        items: state.items ? state.items.map(note => 
          note.id === action.payload.id ? action.payload : note
        ) : null,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false },
        currentNote: { id: null, text: '' } // Reset current note after successful update
      };
      
    case NOTES_ACTION.UPDATE_NOTE_FAILURE:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    // Note deletion
    case NOTES_ACTION.DELETE_NOTE_REQUEST:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: true }
      };
      
    case NOTES_ACTION.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        items: state.items ? 
          state.items
            .map(note => {
              if (note.id === action.payload.id) {
                return null; // Mark for removal
              }
              
              // Check for replies to remove
              if (note.replies && note.replies.length > 0) {
                return {
                  ...note,
                  replies: note.replies.filter(reply => reply.id !== action.payload.id)
                };
              }
              
              return note;
            })
            .filter(Boolean) as any : null, // Remove nulls
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    case NOTES_ACTION.DELETE_NOTE_FAILURE:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    // Reply creation
    case NOTES_ACTION.CREATE_REPLY_REQUEST:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: true }
      };
      
    case NOTES_ACTION.CREATE_REPLY_SUCCESS:
      return {
        ...state,
        items: state.items ? 
          state.items.map(note =>
            note.id === action.payload.parent_id ? 
            {
              ...note,
              replies: [...(note.replies || []), action.payload]
            } :
            note
          ) : null,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    case NOTES_ACTION.CREATE_REPLY_FAILURE:
      return {
        ...state,
        pendingOperations: { ...state.pendingOperations, isSubmitting: false }
      };
      
    // Current note state
    case NOTES_ACTION.SET_CURRENT_NOTE_TEXT:
      return {
        ...state,
        currentNote: { ...state.currentNote, text: action.payload }
      };
      
    case NOTES_ACTION.SET_CURRENT_NOTE_ID:
      return {
        ...state,
        currentNote: { ...state.currentNote, id: action.payload }
      };
      
    case NOTES_ACTION.RESET_CURRENT_NOTE:
      return {
        ...state,
        currentNote: { id: null, text: '' }
      };
      
    default:
      return state;
  }
};