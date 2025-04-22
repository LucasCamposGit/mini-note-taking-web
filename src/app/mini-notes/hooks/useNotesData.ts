import { useEffect } from "react";
import { NOTES_ACTION } from "@/types/action";
import { Note } from "@/types/note";
import { useMiniNotesPageDispatch } from "../context";
import useFetch from "@/hooks/useFetch";

export function useNotesData() {
  const dispatch = useMiniNotesPageDispatch();
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetchData("/api/notes/tree", "GET");
        if (response) {
          if (Array.isArray(response)) {
            const isValidNoteArray = response.every(
              (item) =>
                typeof item === "object" &&
                item !== null &&
                "id" in item &&
                "text" in item &&
                "created_at" in item
            );

            if (isValidNoteArray) {
              dispatch({
                type: NOTES_ACTION.FETCH_NOTES_SUCCESS,
                payload: response as Note[],
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [fetchData, dispatch]);
}