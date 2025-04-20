"use client";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMiniNotesContext } from "../../context";
import { CARD_ACTION } from "@/types/action";

interface CardReplyBtnProps {
  noteId: number;
}

export default function CardReplyBtn({ noteId }: CardReplyBtnProps) {
  const { state, dispatch } = useMiniNotesContext();
  
  const handleReplyClick = () => {
    dispatch({
      type: CARD_ACTION.SET_REPLYING_TO,
      payload: noteId
    });
  };

  return (
    <button
      onClick={handleReplyClick}
      className="flex items-center group cursor-pointer text-gray-500 
      hover:text-blue-400 py-1.5 px-2 rounded-md
      transition-colors duration-150 ease-in-out
      hover:bg-blue-900/10"
    >
      <FontAwesomeIcon
        icon={faComment}
        className="mr-2 w-3 group-hover:text-blue-400"
      />
      <span className="text-sm group-hover:text-blue-400">Reply</span>
    </button>
  );
}
