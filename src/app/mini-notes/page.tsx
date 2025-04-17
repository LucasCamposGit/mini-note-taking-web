"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer, useCallback, useMemo } from "react";
import { initialRootState, rootReducer } from "@/reducers/rootReducer";
import { MINI_NOTES_ACTION } from "@/types/action";
import { Note } from "@/types/note";

/**
 * Main component for the Mini Notes page.
 * It sets up the reducer and effects for data fetching.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function MiniNotesPage() {
  const { fetchData, data } = useFetch();
  const [state, dispatchBase] = useReducer(rootReducer, initialRootState);
  
  // Memoize dispatch function to prevent unnecessary rerenders
  const dispatch = useCallback(dispatchBase, []);

  /**
   * Effect to fetch data from the API when the component mounts.
   */
  useEffect(() => {
    fetchData("/api/notes/tree", "GET");
  }, [fetchData]);

  /**
   * Effect to dispatch an action when data is fetched.
   */
  useEffect(() => {
    if (data) {
      dispatch({
        type: MINI_NOTES_ACTION.LOAD_DATA,
        payload: data as Note[]
      });
    }
  }, [data, dispatch]);

  return (
    <MiniNotes
      state={state}
      dispatch={dispatch}
      title={<MiniNotes.Title />}
      input={<MiniNotes.Input />}
      notes={<MiniNotes.Card />}
    />
  );
}
