import React from "react";
import { CardContext } from "./CardContext";
import { State } from "./types";
import { CardNote } from "./CardNote";

interface CardProps {
    state: State;
    children: React.ReactNode;
}


const Card: React.FC<CardProps> = ({
    state,
    children
}) => {

    return (
        <CardContext.Provider value={state}>
            {children}
        </CardContext.Provider>
    );
};

Card.Note = CardNote;
Card.ReplyForm = CardReplyForm;
Card.Replies = CardReplies;

export default Card; 