"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer } from "react";

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

const baseState = {
  notes: null,
  value: "",
};

export default function MiniNotesPage() {
  const { fetchData, data } = useFetch();
  const [state, dispatch] = useReducer(reducer, baseState);

  useEffect(() => {
    fetchData("/api/notes/tree", "GET");
  }, []);

  useEffect(() => {
    console.log(data)
    dispatch({
      type: ACTION.LOAD_DATA,
      payload: data,
    });
  }, [data]);


  return (
    <MiniNotes
      state={state}
      title={<MiniNotes.Title />}
      input={<MiniNotes.Input dispatch={dispatch} />}
      notes={<MiniNotes.Card dispatch={dispatch} />}
    />
  );
}
