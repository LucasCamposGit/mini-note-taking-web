"use client";
import "@/lib/fontawesome";
import MiniNotes from "./components/MiniNotes";
import useFetch from "@/hooks/useFetch";
import { useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION, Note, State } from "./types";

/**
 * Initial state for the application.
 * @type {State}
 */
const baseState: State = {
  notes: null,
  value: "",
  ui: {
    isEditing: false,
    isReplying: false,
    activeNoteId: null,
    isSubmitting: false
  }
};

/**
 * Main component for the Mini Notes page.
 * It sets up the reducer and effects for data fetching.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function MiniNotesPage() {
  const { fetchData, data } = useFetch();
  const [state, dispatch] = useReducer(reducer, baseState);

  /**
   * Effect to fetch data from the API when the component mounts.
   */
  useEffect(() => {
    fetchData("/api/notes/tree", "GET");
  }, []);

  /**
   * Effect to dispatch an action when data is fetched.
   */
  useEffect(() => {
    console.log(data)
    if (data) {
      dispatch({
        type: ACTION.LOAD_DATA,
        payload: data as Note[]
      });
    }
  }, [data]);

  /**
   * Renders the MiniNotes component with the current state and dispatch functions.
   */
  return (
    <MiniNotes
      state={state}
      title={<MiniNotes.Title />}
      input={<MiniNotes.Input dispatch={dispatch} />}
      notes={<MiniNotes.Card dispatch={dispatch} />}
    />
  );
}
