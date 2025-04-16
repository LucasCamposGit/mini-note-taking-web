import React from "react";
import { CardNote } from "./CardNote";
import { CardReplies } from "./CardReplies";
import { CardReplyForm } from "./CardReplyForm";
import { CardState } from "@/types/state";
import { initialCardState } from "@/reducers/cardReducer";

interface CardProps {
  state?: CardState;
  children: React.ReactNode;
}

function Card({
  state = initialCardState,
  children
}: CardProps) {
  return (
    <div>
      {children}
    </div>
  );
}

Card.Note = CardNote;
Card.ReplyForm = CardReplyForm;
Card.Replies = CardReplies;

export default Card; 