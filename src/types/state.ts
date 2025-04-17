import { Note } from "./note";

export interface MiniNotesState {
  notes: Note[] | null;
  value: string;
  ui: UIState;
}

interface UIState {
  isEditing: boolean;
  isReplying: boolean;
  activeNoteId: number | null;
  isSubmitting: boolean;
}


// CARD

export interface CardState {
  replyingTo: number | null;
  replyText: string;
  isSubmitting: boolean;
  expandedNotes: { [key: number]: boolean };
  editingNoteId: number | null;
  editText: string;
}