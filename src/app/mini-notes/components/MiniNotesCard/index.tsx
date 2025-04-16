import Card from "./Card";
import { Note } from "@/types/note";
import { useMiniNotesContext } from "../MiniNotesContext";

export default function MiniNotesCard() {
  const { state } = useMiniNotesContext();

  return (
    <Card>
      {state.miniNotes.notes?.map((note: Note) => {
        return (
          <div key={note.id} className="note-card p-4 my-2 rounded-xl">
            <Card.Note note={note} />
            <Card.ReplyForm noteId={note.id} />
            {note.replies && note.replies.length > 0 &&
              <Card.Replies note={note} />
            }
          </div>
        );
      })}
    </Card>
  );
}