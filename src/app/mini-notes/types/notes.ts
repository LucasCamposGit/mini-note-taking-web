/**
 * Represents a note in the application.
 */
export interface Note {
  id: number;
  text: string;
  parent_id: number;
  created_at: string;
  replies: Note[];
}

/**
 * Represents the UI state for local interactions.
 */
export interface UIState {
  isEditing: boolean;
  isReplying: boolean;
  activeNoteId: number | null;
  isSubmitting: boolean;
}

/**
 * Represents the overall application state.
 */
export interface State {
  notes: Note[] | null;
  value: string;
  ui: UIState;
}

/**
 * Enum for action types used in the reducer.
 */
export enum ACTION {
  LOAD_DATA = "load_data",
  SUBMIT_NOTE = "submit_note",
  TYPING = "typing",
  ADD_NOTE = "add_note",
  ADD_REPLY = "add_reply",
  SET_EDITING = "set_editing",
  SET_REPLYING = "set_replying",
  SET_ACTIVE_NOTE = "set_active_note",
  SET_SUBMITTING = "set_submitting"
}

/**
 * Type for actions that can be dispatched in the application.
 */
export type NoteAction =
  | { type: ACTION.LOAD_DATA; payload: Note[] }
  | { type: ACTION.SUBMIT_NOTE }
  | { type: ACTION.TYPING; payload: string }
  | { type: ACTION.ADD_NOTE; payload: Note }
  | { type: ACTION.ADD_REPLY; payload: Note }
  | { type: ACTION.SET_EDITING; payload: boolean }
  | { type: ACTION.SET_REPLYING; payload: boolean }
  | { type: ACTION.SET_ACTIVE_NOTE; payload: number | null }
  | { type: ACTION.SET_SUBMITTING; payload: boolean }; 