"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer } from "react";
import { reducer } from "./reducer";

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
