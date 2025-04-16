import { useReducer } from "react";
import Card from "./Card";
import { initialCardState, miniNotesCardReducer } from "./reducer";

export default function MiniNotesCard() {
    const [state, dispatch] = useReducer(miniNotesCardReducer, initialCardState)

    return (
        <Card state={state} > 
          {state.notes.map((note: Note) => (
          <div key={note.id} className="note-card p-4 my-2 rounded-xl"></div>
            <Card.Note 

        </Card>
    )
}