import React, { useReducer } from "react";
import { Dispatch } from "react";
import { NoteAction, Note } from "../../types";
import { useMiniNotesContext } from "../MiniNotesContext";
import { MiniNotesCardProvider } from "./MiniNotesCardContext";
import { MiniNotesCardNote } from "./MiniNotesCardNote";
import { MiniNotesCardReplies } from "./MiniNotesCardReplies";
import { MiniNotesCardReplyForm } from "./MiniNotesCardReplyForm";
import { MiniNotesCardProviderComponent } from "./MiniNotesCardProvider";
import { miniNotesCardReducer, initialCardState } from "./MiniNotesCardReducer";

/**
 * Props for the MiniNotesCard component.
 */
interface MiniNotesCardProps {
  children?: React.ReactNode;
  dispatch: Dispatch<NoteAction>;
}

/**
 * Component for rendering a card of mini notes.
 * It provides the context and layout for individual notes and their replies.
 *
 * @param {MiniNotesCardProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null if no notes.
 */
function MiniNotesCard({ dispatch }: MiniNotesCardProps) {
  const state = useMiniNotesContext();
  const [cardState, cardDispatch] = useReducer(miniNotesCardReducer, initialCardState);
  
  if (!state?.notes) return null;

  /**
   * Renders the MiniNotesCard component with the provided context and children.
   */
  return (
    <MiniNotesCardProvider 
      state={cardState} 
      cardDispatch={cardDispatch} 
      dispatch={dispatch}
    >
      <MiniNotesCardProviderComponent>
        {state.notes.map((note: Note) => (
          <div key={note.id} className="note-card p-4 my-2 rounded-xl">
            <MiniNotesCard.Note note={note} />
            <MiniNotesCard.ReplyForm noteId={note.id} />
            {note.replies?.length > 0 && (
              <MiniNotesCard.Replies note={note} />
            )}
          </div>
        ))}
      </MiniNotesCardProviderComponent>
    </MiniNotesCardProvider>
  );
}

/**
 * Assigns subcomponents to the MiniNotesCard component.
 */
MiniNotesCard.Note = MiniNotesCardNote;
MiniNotesCard.ReplyForm = MiniNotesCardReplyForm;
MiniNotesCard.Replies = MiniNotesCardReplies;

export default MiniNotesCard; 