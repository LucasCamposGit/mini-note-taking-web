import { Note } from "./note";

// ====== DOMAIN-DRIVEN ACTION TYPES ======

// 1. NOTES DOMAIN ACTIONS
export enum NOTES_ACTION {
  // Data fetching and loading
  FETCH_NOTES_REQUEST = "notes/fetchRequest",
  FETCH_NOTES_SUCCESS = "notes/fetchSuccess",
  FETCH_NOTES_FAILURE = "notes/fetchFailure",
  
  // Note creation
  CREATE_NOTE_REQUEST = "notes/createRequest",
  CREATE_NOTE_SUCCESS = "notes/createSuccess",
  CREATE_NOTE_FAILURE = "notes/createFailure",
  
  // Note editing
  UPDATE_NOTE_REQUEST = "notes/updateRequest",
  UPDATE_NOTE_SUCCESS = "notes/updateSuccess",
  UPDATE_NOTE_FAILURE = "notes/updateFailure",
  
  // Note deletion
  DELETE_NOTE_REQUEST = "notes/deleteRequest",
  DELETE_NOTE_SUCCESS = "notes/deleteSuccess",
  DELETE_NOTE_FAILURE = "notes/deleteFailure",
  
  // Reply actions
  CREATE_REPLY_REQUEST = "notes/createReplyRequest",
  CREATE_REPLY_SUCCESS = "notes/createReplySuccess",
  CREATE_REPLY_FAILURE = "notes/createReplyFailure",
  
  // Note content editing (before submission)
  SET_CURRENT_NOTE_TEXT = "notes/setCurrentNoteText",
  SET_CURRENT_NOTE_ID = "notes/setCurrentNoteId",
  RESET_CURRENT_NOTE = "notes/resetCurrentNote",
}

// 2. UI DOMAIN ACTIONS
export enum UI_ACTION {
  // Editor UI 
  UPDATE_CHAR_COUNT = "ui/updateCharCount",
  SET_EDITOR_DIRTY = "ui/setEditorDirty",
  
  // Card UI
  TOGGLE_CARD_EXPANDED = "ui/toggleCardExpanded",
  SET_ACTIVE_MENU = "ui/setActiveMenu",
  CLOSE_ALL_MENUS = "ui/closeAllMenus",
  
  // Reply UI
  START_REPLY = "ui/startReply",
  UPDATE_REPLY_TEXT = "ui/updateReplyText",
  CANCEL_REPLY = "ui/cancelReply",
  
  // Edit UI
  START_EDIT = "ui/startEdit",
  UPDATE_EDIT_TEXT = "ui/updateEditText",
  CANCEL_EDIT = "ui/cancelEdit",
  
  // Modal UI
  OPEN_MODAL = "ui/openModal", 
  CLOSE_MODAL = "ui/closeModal",
}

// 3. AUTH DOMAIN ACTIONS
export enum AUTH_ACTION {
  LOGIN_REQUEST = "auth/loginRequest",
  LOGIN_SUCCESS = "auth/loginSuccess",
  LOGIN_FAILURE = "auth/loginFailure",
  
  LOGOUT = "auth/logout",
  
  REFRESH_TOKEN_REQUEST = "auth/refreshTokenRequest",
  REFRESH_TOKEN_SUCCESS = "auth/refreshTokenSuccess",
  REFRESH_TOKEN_FAILURE = "auth/refreshTokenFailure",
  
  UPDATE_USER_PROFILE = "auth/updateUserProfile",
  SET_PREMIUM_STATUS = "auth/setPremiumStatus",
}

// Action creator types for each domain
export type NotesAction =
  // Fetch notes
  | { type: NOTES_ACTION.FETCH_NOTES_REQUEST }
  | { type: NOTES_ACTION.FETCH_NOTES_SUCCESS; payload: Note[] }
  | { type: NOTES_ACTION.FETCH_NOTES_FAILURE; payload: string }
  
  // Create note
  | { type: NOTES_ACTION.CREATE_NOTE_REQUEST }
  | { type: NOTES_ACTION.CREATE_NOTE_SUCCESS; payload: Note }
  | { type: NOTES_ACTION.CREATE_NOTE_FAILURE; payload: string }
  
  // Update note
  | { type: NOTES_ACTION.UPDATE_NOTE_REQUEST; payload: { id: number } }
  | { type: NOTES_ACTION.UPDATE_NOTE_SUCCESS; payload: Note }
  | { type: NOTES_ACTION.UPDATE_NOTE_FAILURE; payload: string }
  
  // Delete note
  | { type: NOTES_ACTION.DELETE_NOTE_REQUEST; payload: { id: number } }
  | { type: NOTES_ACTION.DELETE_NOTE_SUCCESS; payload: { id: number } }
  | { type: NOTES_ACTION.DELETE_NOTE_FAILURE; payload: string }
  
  // Create reply
  | { type: NOTES_ACTION.CREATE_REPLY_REQUEST; payload: { parentId: number } }
  | { type: NOTES_ACTION.CREATE_REPLY_SUCCESS; payload: Note }
  | { type: NOTES_ACTION.CREATE_REPLY_FAILURE; payload: string }
  
  // Edit current note (local state)
  | { type: NOTES_ACTION.SET_CURRENT_NOTE_TEXT; payload: string }
  | { type: NOTES_ACTION.SET_CURRENT_NOTE_ID; payload: number | null }
  | { type: NOTES_ACTION.RESET_CURRENT_NOTE };

export type UIAction =
  // Editor actions
  | { type: UI_ACTION.UPDATE_CHAR_COUNT; payload: number }
  | { type: UI_ACTION.SET_EDITOR_DIRTY; payload: boolean }
  
  // Card UI actions
  | { type: UI_ACTION.TOGGLE_CARD_EXPANDED; payload: number }
  | { type: UI_ACTION.SET_ACTIVE_MENU; payload: number | null }
  | { type: UI_ACTION.CLOSE_ALL_MENUS }
  
  // Reply actions
  | { type: UI_ACTION.START_REPLY; payload: number }
  | { type: UI_ACTION.UPDATE_REPLY_TEXT; payload: string }
  | { type: UI_ACTION.CANCEL_REPLY }
  
  // Edit actions
  | { type: UI_ACTION.START_EDIT; payload: { noteId: number, text: string } }
  | { type: UI_ACTION.UPDATE_EDIT_TEXT; payload: string }
  | { type: UI_ACTION.CANCEL_EDIT }
  
  // Modal actions
  | { type: UI_ACTION.OPEN_MODAL; payload: { type: 'delete' | 'edit' | 'reply' } }
  | { type: UI_ACTION.CLOSE_MODAL };

export type AuthAction =
  // Login actions
  | { type: AUTH_ACTION.LOGIN_REQUEST }
  | { type: AUTH_ACTION.LOGIN_SUCCESS; payload: { token: string, refreshToken: string, user: any } }
  | { type: AUTH_ACTION.LOGIN_FAILURE; payload: string }
  
  // Logout
  | { type: AUTH_ACTION.LOGOUT }
  
  // Token refresh
  | { type: AUTH_ACTION.REFRESH_TOKEN_REQUEST }
  | { type: AUTH_ACTION.REFRESH_TOKEN_SUCCESS; payload: { token: string, refreshToken: string } }
  | { type: AUTH_ACTION.REFRESH_TOKEN_FAILURE }
  
  // User profile
  | { type: AUTH_ACTION.UPDATE_USER_PROFILE; payload: { name?: string, email?: string } }
  | { type: AUTH_ACTION.SET_PREMIUM_STATUS; payload: boolean };

// Root action type that combines all domain actions
export type AppAction = NotesAction | UIAction | AuthAction;

// Legacy action types for backwards compatibility during refactoring
// mini notes page
export enum MINI_NOTES_ACTION {
    LOAD_DATA = "load_data",
    SUBMIT_NOTE = "submit_note",
    TYPING = "typing",
    ADD_NOTE = "add_note",
    ADD_REPLY = "add_reply",
    SET_EDITING = "set_editing",
    SET_REPLYING = "set_replying",
    SET_ACTIVE_NOTE = "set_active_note",
    SET_SUBMITTING = "set_submitting",
    DELETE_NOTE = "delete_note",
    UPDATE_NOTE = "update_note",
}

export type MiniNotesAction =
    | { type: MINI_NOTES_ACTION.LOAD_DATA; payload: Note[] }
    | { type: MINI_NOTES_ACTION.SUBMIT_NOTE }
    | { type: MINI_NOTES_ACTION.TYPING; payload: string }
    | { type: MINI_NOTES_ACTION.ADD_NOTE; payload: Note }
    | { type: MINI_NOTES_ACTION.ADD_REPLY; payload: Note }
    | { type: MINI_NOTES_ACTION.SET_EDITING; payload: boolean }
    | { type: MINI_NOTES_ACTION.SET_REPLYING; payload: boolean }
    | { type: MINI_NOTES_ACTION.SET_ACTIVE_NOTE; payload: number | null }
    | { type: MINI_NOTES_ACTION.SET_SUBMITTING; payload: boolean }
    | { type: MINI_NOTES_ACTION.DELETE_NOTE; payload: number }
    | { type: MINI_NOTES_ACTION.UPDATE_NOTE; payload: Note }

// card component from mini notes page
export enum CARD_ACTION {
    SET_REPLYING_TO = "set_replying_to",
    SET_REPLY_TEXT = "set_reply_text",
    TOGGLE_REPLIES = "toggle_replies",
    SET_SUBMITTING_REPLY = "set_submitting_reply",
    RESET_REPLY = "reset_reply",
    SET_EDITING_NOTE = "set_editing_note",
    SET_EDIT_TEXT = "set_edit_text",
    RESET_EDIT = "reset_edit",
    TOGGLE_MENU = "toggle_menu"
}

export type CardAction =
    | { type: CARD_ACTION.SET_REPLYING_TO; payload: number | null }
    | { type: CARD_ACTION.SET_REPLY_TEXT; payload: string }
    | { type: CARD_ACTION.TOGGLE_REPLIES; payload: number }
    | { type: CARD_ACTION.SET_SUBMITTING_REPLY; payload: boolean }
    | { type: CARD_ACTION.RESET_REPLY }
    | { type: CARD_ACTION.SET_EDITING_NOTE; payload: { noteId: number | null, text: string } }
    | { type: CARD_ACTION.SET_EDIT_TEXT; payload: string }
    | { type: CARD_ACTION.RESET_EDIT }
    | { type: CARD_ACTION.TOGGLE_MENU; payload: number };
