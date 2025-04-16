import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Action } from './LoginContext';

// Types
interface NoteCardUIState {
  replyingTo: string | null;
  replyText: string;
  isEditing: boolean;
  editText: string;
  isSubmitting: boolean;
  expandedNotes: Record<string, boolean>;
}

type NoteCardAction =
  | { type: 'SET_REPLYING_TO'; payload: string | null }
  | { type: 'SET_REPLY_TEXT'; payload: string }
  | { type: 'SET_IS_EDITING'; payload: boolean }
  | { type: 'SET_EDIT_TEXT'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'TOGGLE_REPLIES'; payload: string }
  | { type: 'RESET_REPLY' };

// Contexts
const NoteCardUIContext = createContext<NoteCardUIState | null>(null);
const NoteCardDispatchContext = createContext<React.Dispatch<NoteCardAction> | null>(null);
const NoteCardAppDispatchContext = createContext<React.Dispatch<Action> | null>(null);

// Reducer
const noteCardReducer = (state: NoteCardUIState, action: NoteCardAction): NoteCardUIState => {
  switch (action.type) {
    case 'SET_REPLYING_TO':
      return { ...state, replyingTo: action.payload };
    case 'SET_REPLY_TEXT':
      return { ...state, replyText: action.payload };
    case 'SET_IS_EDITING':
      return { ...state, isEditing: action.payload };
    case 'SET_EDIT_TEXT':
      return { ...state, editText: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'TOGGLE_REPLIES':
      return {
        ...state,
        expandedNotes: {
          ...state.expandedNotes,
          [action.payload]: !state.expandedNotes[action.payload]
        }
      };
    case 'RESET_REPLY':
      return {
        ...state,
        replyingTo: null,
        replyText: '',
        isSubmitting: false
      };
    default:
      return state;
  }
};

// Provider Component
interface NoteCardProviderProps {
  children: ReactNode;
  appDispatch: React.Dispatch<Action>;
}

export const NoteCardProvider: React.FC<NoteCardProviderProps> = ({ children, appDispatch }) => {
  const [state, cardDispatch] = useReducer(noteCardReducer, {
    replyingTo: null,
    replyText: '',
    isEditing: false,
    editText: '',
    isSubmitting: false,
    expandedNotes: {}
  });

  return (
    <NoteCardUIContext.Provider value={state}>
      <NoteCardDispatchContext.Provider value={cardDispatch}>
        <NoteCardAppDispatchContext.Provider value={appDispatch}>
          {children}
        </NoteCardAppDispatchContext.Provider>
      </NoteCardDispatchContext.Provider>
    </NoteCardUIContext.Provider>
  );
};

// Custom Hooks
export const useNoteCardState = () => {
  const context = useContext(NoteCardUIContext);
  if (!context) {
    throw new Error('useNoteCardState must be used within a NoteCardProvider');
  }
  return context;
};

export const useNoteCardDispatch = () => {
  const context = useContext(NoteCardDispatchContext);
  if (!context) {
    throw new Error('useNoteCardDispatch must be used within a NoteCardProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(NoteCardAppDispatchContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within a NoteCardProvider');
  }
  return context;
}; 