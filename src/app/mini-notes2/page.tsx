"use client";

import { useEffect, useReducer, useRef } from "react";
import { Input } from "./components/input";
import MiniNotesContext from "./context";
import { initialRootState, rootReducer } from "@/reducers/rootReducer";
import { Card } from "./components/card";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import useFetch from "@/hooks/useFetch";
import { MINI_NOTES_ACTION, CARD_ACTION } from "@/types/action";
import { Note } from "@/types/note";

export default function MiniNotesPage() {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);
  const { fetchData, data } = useFetch();
  const replyFormRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const editFormRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

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

  // Effect to handle visibility of reply forms
  useEffect(() => {
    // Hide all reply forms first
    Object.values(replyFormRefs.current).forEach(ref => {
      if (ref) {
        ref.style.display = 'none';
      }
    });
    
    // Show only the active reply form if replyingTo is not null
    if (state.card.replyingTo !== null) {
      const activeFormRef = replyFormRefs.current[state.card.replyingTo];
      if (activeFormRef) {
        activeFormRef.style.display = 'block';
      }
    }
  }, [state.card.replyingTo]);

  // Effect to handle visibility of edit forms
  useEffect(() => {
    // Hide all edit forms first
    Object.values(editFormRefs.current).forEach(ref => {
      if (ref) {
        ref.style.display = 'none';
      }
    });
    
    // Show only the active edit form if editingNoteId is not null
    if (state.card.editingNoteId !== null) {
      const activeFormRef = editFormRefs.current[state.card.editingNoteId];
      if (activeFormRef) {
        activeFormRef.style.display = 'block';
      }
    }
  }, [state.card.editingNoteId]);

  // Ref callback functions
  const setReplyFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = el;
  };

  const setEditFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    editFormRefs.current[noteId] = el;
  };

  // Handle edit note functionality
  const handleEditNote = (noteId: number, text: string) => {
    dispatch({
      type: CARD_ACTION.SET_EDITING_NOTE,
      payload: { noteId, text }
    });
  };

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
              
              {state.card.editingNoteId === note.id ? (
                <div ref={setEditFormRef(note.id)}>
                  <Card.EditForm noteId={note.id} initialText={note.text} />
                </div>
              ) : (
                <Card.Note text={note.text} />
              )}
              
              <Card.ReplyBtn noteId={note.id} />
              
              <div 
                ref={setReplyFormRef(note.id)} 
                style={{ display: 'none' }}
              >
                <Card.ReplyForm noteId={note.id} />
              </div>
              
              <Card.Menu noteId={note.id}>
                <Card.MenuOption
                  icon={faPencilAlt}
                  label="Edit"
                  onOptionClick={() => handleEditNote(note.id, note.text)}
                />
                <Card.MenuOption
                  icon={faTrash}
                  label="Delete"
                  onOptionClick={() => {}}
                />
              </Card.Menu>
              {note.replies?.map((reply) => (
                <Card.Reply key={reply.id}>
                  {state.card.editingNoteId === reply.id ? (
                    <div ref={setEditFormRef(reply.id)}>
                      <Card.EditForm noteId={reply.id} initialText={reply.text} />
                    </div>
                  ) : (
                    <Card.ReplyNote text={reply.text} />
                  )}
                  <Card.MenuToggleBtn noteId={reply.id} isReply={true} />
                  <Card.Menu noteId={reply.id}>
                    <Card.MenuOption
                      icon={faPencilAlt}
                      label="Edit"
                      onOptionClick={() => handleEditNote(reply.id, reply.text)}
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
