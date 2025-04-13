export enum ACTION {
    LOAD_DATA = "load_data",
    SUBMIT_NOTE = "submit_note",
    TYPING = "typing",
    ADD_NOTE = "add_note",
    ADD_REPLY = "add_reply"
  }
  
  export interface Action {
    type: ACTION;
    payload?: any;
  }
  
  export interface Note {
    id: number;
    text: string;
    parent_id: number;
    created_at: string;
    replies: Note[];
  }
  
  export interface State {
    notes: Note[] | null;
    value: string
  }
  