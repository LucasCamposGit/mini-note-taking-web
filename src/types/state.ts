import { Note } from "./note";

// ====== APPLICATION DOMAINS ======

// 1. Notes Domain - All data related to notes
export interface NotesState {
  items: Note[] | null;           // All notes data from the API
  currentNote: {                  // Currently active note being worked with
    id: number | null;            // ID of the current note
    text: string;                 // Text content for current editing/creation
  };
  pendingOperations: {            // Track async operations
    isLoading: boolean;           // Initial data loading state
    isSubmitting: boolean;        // When creating/updating a note
  };
}

// 2. UI Domain - All UI state across the application
export interface UIState {
  noteEditor: {                   // Note editor UI state
    isDirty: boolean;             // If editor has unsaved changes
    characterCount: number;       // For character counter feature
  };
  noteCard: {                     // Note card UI state
    expandedCards: Record<number, boolean>;  // Which cards have expanded replies
    activeMenuId: number | null;             // Which card has open menu
    replyingTo: number | null;               // Which note is being replied to
    replyText: string;                       // Content of current reply
    editingNoteId: number | null;            // Which note is being edited
    editText: string;                        // Content of current edit
  };
  modal: {                        // Modal dialogs state
    isOpen: boolean;              // If any modal is open
    type: 'delete' | 'edit' | 'reply' | null; // Type of modal shown
  };
}

// 3. Auth Domain - User authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    isPremium: boolean;
  };
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

// Root application state combining all domains
export interface MiniNotesPageState {
  notes: NotesState;
  ui: UIState;
  auth: AuthState;
}

// Initial state values

// Notes domain initial state
export const initialNotesState: NotesState = {
  items: null,
  currentNote: {
    id: null,
    text: '',
  },
  pendingOperations: {
    isLoading: false,
    isSubmitting: false,
  }
};

// UI domain initial state
export const initialUIState: UIState = {
  noteEditor: {
    isDirty: false,
    characterCount: 0,
  },
  noteCard: {
    expandedCards: {},
    activeMenuId: null,
    replyingTo: null,
    replyText: '',
    editingNoteId: null,
    editText: '',
  },
  modal: {
    isOpen: false,
    type: null,
  }
};

// Auth domain initial state
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    name: null,
    isPremium: false,
  },
  tokens: {
    accessToken: null,
    refreshToken: null,
  }
};

// Root initial state
export const initialMiniNotesPageState: MiniNotesPageState = {
  notes: initialNotesState,
  ui: initialUIState,
  auth: initialAuthState,
};

// Legacy types for backwards compatibility during migration
export interface MiniNotesState {
  notes: Note[] | null;
  value: string;
  ui: {
    isEditing: boolean;
    isReplying: boolean;
    activeNoteId: number | null;
    isSubmitting: boolean;
  };
}

export interface CardState {
  replyingTo: number | null;
  replyText: string;
  isSubmitting: boolean;
  expandedNotes: { [key: number]: boolean };
  editingNoteId: number | null;
  editText: string;
  activeMenuId: number | null;
}