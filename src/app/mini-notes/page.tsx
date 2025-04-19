"use client";

import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer, useCallback, useMemo, Suspense } from "react";
import { initialRootState, rootReducer } from "@/reducers/rootReducer";
import { MINI_NOTES_ACTION } from "@/types/action";
import { Note } from "@/types/note";
import Loading from "./loading";


export default function MiniNotesPage() {
  const { fetchData, data } = useFetch();
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  useEffect(() => {
    fetchData("/api/notes/tree", "GET");
  }, [fetchData]);


  useEffect(() => {
    if (data) {
      dispatch({
        type: MINI_NOTES_ACTION.LOAD_DATA,
        payload: data as Note[]
      });
    }
  }, [data, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <MiniNotes
        state={state}
        dispatch={dispatch}
        title={<MiniNotes.Title />}
        input={<MiniNotes.Input />}
        notes={<MiniNotes.Card />}
      />
    </Suspense>

  );
}
