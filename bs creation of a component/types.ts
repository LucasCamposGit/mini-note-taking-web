// Action types
export enum ACTION {
    SET_REPLYING_TO = "set_replying_to",
    SET_REPLY_TEXT = "set_reply_text",
    TOGGLE_REPLIES = "toggle_replies",
    SET_SUBMITTING = "set_submitting",
    RESET_REPLY = "reset_reply",
  }
  
  // Action interface
  export interface Action {
    type: ACTION;
    payload?: any;
  }
  
  export interface State {
    replyingTo: number | null;
    replyText: string;
    isSubmitting: boolean;
    expandedNotes: { [key: number]: boolean };
  }