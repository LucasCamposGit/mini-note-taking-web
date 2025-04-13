"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION } from "./types";



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
