"use client";

import { Input } from "./components/input";
import { Card } from "./components/card";
import { useMiniNotesPageState } from "./context";
import { useNoteVisibility } from "./hooks/useNoteVisibility";
import { useNotesData } from "./hooks/useNotesData";

export default function MiniNotesPage() {
  const state = useMiniNotesPageState();
  const {
    setReplyFormRef,
    setEditFormRef,
    setReplyNoteRef,
    setReplyEditFormRef,
    setNoteContentRef
  } = useNoteVisibility();
  
  // Load notes data
  useNotesData();

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
