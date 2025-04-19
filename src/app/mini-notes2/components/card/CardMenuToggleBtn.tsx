import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMiniNotesContext } from "../../context";
import { CARD_ACTION } from "@/types/action";

interface CardMenuToggleBtnProps {
  noteId: number;
}

export default function CardMenuToggleBtn({ noteId }: CardMenuToggleBtnProps) {
  const { dispatch } = useMiniNotesContext();

  const toggleMenu = () => {
    dispatch({
      type: CARD_ACTION.TOGGLE_MENU,
      payload: noteId
    });
  };

  return (
    <button
      onClick={toggleMenu}
      className="absolute top-3 right-3 text-gray-500 hover:text-blue-400 
      flex items-center justify-center w-8 h-8 rounded-full
      transition-colors duration-150 ease-in-out
      hover:bg-gray-800/80 focus:outline-none"
      aria-label="Menu"
    >
      <FontAwesomeIcon icon={faEllipsisH} className="w-3" />
    </button>
  );
}
