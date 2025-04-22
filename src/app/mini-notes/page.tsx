"use client";

import { useEffect, useRef } from "react";
import { Input } from "./components/input";
import { Card } from "./components/card";
import useFetch from "@/hooks/useFetch";
import { NOTES_ACTION, UI_ACTION } from "@/types/action";
import { Note } from "@/types/note";
import {
  useMiniNotesPageDispatch,
  useMiniNotesPageState,
} from "./context";

export default function MiniNotesPage() {
  const dispatch = useMiniNotesPageDispatch();
  const state = useMiniNotesPageState();

  const { fetchData, data } = useFetch();
  const replyFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const editFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyNoteRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const replyEditFormRefs = useRef<{ [key: number]: HTMLDivElement | null }>(
    {}
  );
  const noteContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    console.log("State changed:", state);
  }, [state]);

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
  }, [fetchData]);

  // Effect to handle visibility of reply forms
  useEffect(() => {
    // Hide all reply forms first
    Object.values(replyFormRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.display = "none";
      }
    });

    // Show only the active reply form if replyingTo is not null
    if (state.ui.noteCard.replyingTo !== null) {
      const activeFormRef = replyFormRefs.current[state.ui.noteCard.replyingTo];
      if (activeFormRef) {
        activeFormRef.style.display = "block";
      }
    }
  }, [state.ui.noteCard.replyingTo]);

  // Effect to handle visibility of edit forms and note content
  useEffect(() => {
    // Show all note content first
    Object.values(noteContentRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.display = "block";
      }
    });

    // Hide all edit forms first
    Object.values(editFormRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.display = "none";
      }
    });

    // For notes being edited, hide the content and show the edit form
    if (state.ui.noteCard.editingNoteId !== null) {
      const noteContentRef =
        noteContentRefs.current[state.ui.noteCard.editingNoteId];
      const editFormRef = editFormRefs.current[state.ui.noteCard.editingNoteId];

      if (noteContentRef) {
        noteContentRef.style.display = "none";
      }

      if (editFormRef) {
        editFormRef.style.display = "block";
      }
    }
  }, [state.ui.noteCard.editingNoteId]);

  // Effect to handle visibility of reply notes and their edit forms
  useEffect(() => {
    // Show all reply notes first
    Object.values(replyNoteRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.display = "block";
      }
    });

    // Hide all reply edit forms first
    Object.values(replyEditFormRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.display = "none";
      }
    });

    // For replies being edited, hide the note and show the edit form
    if (state.ui.noteCard.editingNoteId !== null) {
      const replyNoteRef =
        replyNoteRefs.current[state.ui.noteCard.editingNoteId];
      const replyEditFormRef =
        replyEditFormRefs.current[state.ui.noteCard.editingNoteId];

      if (replyNoteRef) {
        replyNoteRef.style.display = "none";
      }

      if (replyEditFormRef) {
        replyEditFormRef.style.display = "block";
      }
    }
  }, [state.ui.noteCard.editingNoteId]);

  // Ref callback functions
  const setReplyFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyFormRefs.current[noteId] = el;
  };

  const setEditFormRef = (noteId: number) => (el: HTMLDivElement | null) => {
    editFormRefs.current[noteId] = el;
  };

  const setReplyNoteRef = (noteId: number) => (el: HTMLDivElement | null) => {
    replyNoteRefs.current[noteId] = el;
  };

  const setReplyEditFormRef =
    (noteId: number) => (el: HTMLDivElement | null) => {
      replyEditFormRefs.current[noteId] = el;
    };

  const setNoteContentRef = (noteId: number) => (el: HTMLDivElement | null) => {
    noteContentRefs.current[noteId] = el;
  };

  // Handle edit note functionality

  return (
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

        {Array.isArray(state.notes.items) &&
          state.notes.items?.map((note) => (
            <Card.Root key={note.id}>
              <Card.MenuToggleBtn noteId={note.id} />

              <div ref={setEditFormRef(note.id)} style={{ display: "none" }}>
                <Card.EditForm noteId={note.id} initialText={note.text} />
              </div>
              <div ref={setNoteContentRef(note.id)}>
                <Card.Note text={note.text} />
              </div>

              <Card.ReplyBtn noteId={note.id} />

              <div ref={setReplyFormRef(note.id)} style={{ display: "none" }}>
                <Card.ReplyForm noteId={note.id} />
              </div>

              <Card.Menu noteId={note.id}>
                <Card.MenuEditOption noteId={note.id} text={note.text} />
                <Card.MenuDeleteOption noteId={note.id} />
              </Card.Menu>
              {note.replies?.map((reply) => (
                <Card.Reply key={reply.id}>
                  <div ref={setReplyNoteRef(reply.id)}>
                    <Card.ReplyNote text={reply.text} />
                  </div>
                  <div
                    ref={setReplyEditFormRef(reply.id)}
                    style={{ display: "none" }}
                  >
                    <Card.EditForm noteId={reply.id} initialText={reply.text} />
                  </div>
                  <Card.MenuToggleBtn noteId={reply.id} isReply={true} />
                  <Card.Menu noteId={reply.id}>
                    <Card.MenuEditOption noteId={reply.id} text={reply.text} />
                    <Card.MenuDeleteOption noteId={reply.id} />
                  </Card.Menu>
                </Card.Reply>
              ))}
            </Card.Root>
          ))}
      </div>
    </main>
  );
}
