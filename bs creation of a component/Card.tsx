import React from "react";
import { CardContext } from "./CardContext";

interface CardProps {
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

Card.Note = MiniNotesCardNote;
Card.ReplyForm = MiniNotesCardReplyForm;
Card.Replies = MiniNotesCardReplies;

export default Card; 