"use client";

import { useEffect, useReducer } from "react";
import { Input } from "./components/input";
import MiniNotesContext from "./context";
import { initialRootState, rootReducer } from "@/reducers/rootReducer";
import { Card } from "./components/card";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import useFetch from "@/hooks/useFetch";
import { MINI_NOTES_ACTION } from "@/types/action";
import { Note } from "@/types/note";

export default function MiniNotesPage() {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);
  const { fetchData, data } = useFetch();

  useEffect(() => {
    fetchData("/api/notes/tree", "GET");
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: MINI_NOTES_ACTION.LOAD_DATA,
        payload: data as Note[],
      });
    }
  }, [data, dispatch]);

  return (
    <MiniNotesContext.Provider value={{ state, dispatch }}>
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-light mb-6 text-center tracking-wide">
            Mini Notes
          </h1>

          <Input.Root>
            <Input.Field />
            <div className="flex justify-between items-center min-w-96 ">
              <Input.Counter />
              <Input.Button />
            </div>
          </Input.Root>

          {state.miniNotes.notes?.map((note) => (
            <Card.Root key={note.id}>
              <Card.MenuToggleBtn noteId={note.id} />
              <Card.Note text={note.text} />
              <Card.Menu noteId={note.id}>
                <Card.MenuOption
                  icon={faPencilAlt}
                  label="Edit"
                  onOptionClick={() => {}}
                />
                <Card.MenuOption
                  icon={faTrash}
                  label="Delete"
                  onOptionClick={() => {}}
                />
              </Card.Menu>
              {note.replies?.map((reply) => (
                <Card.Reply key={reply.id}>
                  <Card.ReplyNote text={reply.text} />
                  <Card.MenuToggleBtn noteId={reply.id} />
                  <Card.Menu noteId={reply.id}>
                    <Card.MenuOption
                      icon={faPencilAlt}
                      label="Edit"
                      onOptionClick={() => {}}
                    />
                    <Card.MenuOption
                      icon={faTrash}
                      label="Delete"
                      onOptionClick={() => {}}
                    />
                  </Card.Menu>
                </Card.Reply>
              ))}
            </Card.Root>
          ))}
        </div>
      </main>
    </MiniNotesContext.Provider>
  );
}
