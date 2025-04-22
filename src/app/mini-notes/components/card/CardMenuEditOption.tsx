import { useMiniNotesPageDispatch } from "../../context";
import { UI_ACTION } from "@/types/action";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardMenuEditOptionProps {
  noteId: number;
  text: string;
}

export default function CardMenuEditOption({
  noteId,
  text
}: CardMenuEditOptionProps) {
  const dispatch = useMiniNotesPageDispatch();

  const handleEditNote = (noteId: number, text: string) => {
    dispatch({
      type: UI_ACTION.START_EDIT,
      payload: {
        noteId,
        text,
      },
    });
  };

  return (
    <button
      className="flex items-center w-full text-gray-400 hover:text-blue-400 p-2.5 rounded-md 
      transition-colors duration-150 ease-in-out hover:bg-blue-900/20 focus:outline-none 
      text-sm font-medium"
      onClick={() => handleEditNote(noteId, text)}
    >
      <FontAwesomeIcon icon={faPencil} className="w-3 mr-2.5 flex-shrink-0" />
      <span>Edit</span>
    </button>
  );
}
