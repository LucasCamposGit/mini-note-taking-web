import useFetch from "@/hooks/useFetch";
import { NOTES_ACTION } from "@/types/action";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  useDispatch  from "../../context/DispatchContext";

interface CardMenuDeleteOptionProps {
  noteId: number;
}

export default function CardMenuDeleteOption({
  noteId,
}: CardMenuDeleteOptionProps) {
  const dispatch = useDispatch();
  const { fetchData } = useFetch();

  const handleDeleteNote = async (noteId: number) => {
    dispatch({
      type: NOTES_ACTION.DELETE_NOTE_REQUEST,
      payload: { id: noteId },
    });

    try {
      const response = await fetchData(`/api/notes/${noteId}`, "DELETE");

      console.log("Delete API response:", response);

      dispatch({
        type: NOTES_ACTION.DELETE_NOTE_SUCCESS,
        payload: { id: noteId },
      });
    } catch (error) {
      console.error("Failed to delete note:", error);

      // Handle error if deletion fails
      dispatch({
        type: NOTES_ACTION.DELETE_NOTE_FAILURE,
        payload: "Failed to delete note",
      });
    }
  };

  return (
    <button
      className="flex items-center w-full text-gray-400 hover:text-blue-400 p-2.5 rounded-md 
      transition-colors duration-150 ease-in-out hover:bg-blue-900/20 focus:outline-none 
      text-sm font-medium"
      onClick={() => handleDeleteNote(noteId)}
    >
      <FontAwesomeIcon icon={faTrash} className="w-3 mr-2.5 flex-shrink-0" />
      <span>Delete</span>
    </button>
  );
}
