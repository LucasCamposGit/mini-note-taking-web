import React, { useMemo } from "react";
import Card from "./Card";
import { Note } from "@/types/note";
import { useMiniNotesContext } from "../MiniNotesContext";

const MiniNotesCard: React.FC = () => {
  const { state } = useMiniNotesContext();
  
  // Memoize the notes rendering to prevent unnecessary re-renders
  const notesContent = useMemo(() => {
    return state.miniNotes.notes?.map((note: Note) => (
      <div key={note.id} className="note-card p-4 my-2 rounded-xl">
        <Card.Note note={note} />
        <Card.ReplyForm noteId={note.id} />
        {note.replies && note.replies.length > 0 && <Card.Replies note={note} />}
      </div>
    ));
  }, [state.miniNotes.notes]);

  return <Card>{notesContent}</Card>;
};

export default React.memo(MiniNotesCard);