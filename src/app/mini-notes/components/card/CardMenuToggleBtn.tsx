import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UI_ACTION } from "@/types/action";
import { useMiniNotesPageDispatch } from "@/context/MiniNotesPageContext";

interface CardMenuToggleBtnProps {
  noteId: number;
  isReply?: boolean;
}

export default function CardMenuToggleBtn({ noteId, isReply = false }: CardMenuToggleBtnProps) {
  const dispatch = useMiniNotesPageDispatch();

  const toggleMenu = () => {
    dispatch({
      type: UI_ACTION.SET_ACTIVE_MENU,
      payload: noteId
    });
  };

  // More precise positioning for main notes and replies
  const positionClasses = isReply
    ? "absolute top-0.5 right-1.5 text-gray-500 hover:text-blue-400"
    : "absolute top-3 right-3 text-gray-500 hover:text-blue-400";

  return (
    <button
      onClick={toggleMenu}
      className={`${positionClasses} 
      flex items-center justify-center w-7 h-7 rounded-full
      transition-colors duration-150 ease-in-out
      hover:bg-gray-800/80 focus:outline-none`}
      aria-label="Menu"
    >
      <FontAwesomeIcon icon={faEllipsisV} className="w-3" />
    </button>
  );
}
