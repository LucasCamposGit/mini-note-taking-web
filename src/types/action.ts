import { Note } from "./note";

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
    SET_SUBMITTING = "set_submitting"
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
    | { type: MINI_NOTES_ACTION.SET_SUBMITTING; payload: boolean }; 


// card component from mini notes page
export enum CARD_ACTION {
    SET_REPLYING_TO = "set_replying_to",
    SET_REPLY_TEXT = "set_reply_text",
    TOGGLE_REPLIES = "toggle_replies",
    SET_SUBMITTING = "set_submitting",
    RESET_REPLY = "reset_reply",
  }
  
  // Action interface
export type CardAction =
  | { type: CARD_ACTION.SET_REPLYING_TO; payload: number | null }
  | { type: CARD_ACTION.SET_REPLY_TEXT; payload: string }
  | { type: CARD_ACTION.TOGGLE_REPLIES; payload: number }
  | { type: CARD_ACTION.SET_SUBMITTING; payload: boolean }
  | { type: CARD_ACTION.RESET_REPLY };
