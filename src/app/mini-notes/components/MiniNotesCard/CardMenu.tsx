import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";
import { CARD_ACTION, MINI_NOTES_ACTION } from "@/types/action";
import { useMiniNotesContext } from "../MiniNotesContext";
import useFetch from "@/hooks/useFetch";

interface CardMenuProps {
  note: Note;
}

const CardMenu: React.FC<CardMenuProps> = ({ note }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useMiniNotesContext();
  const { fetchData } = useFetch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Handle clicks outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    if (!dispatch) return;
    
    dispatch({
      type: CARD_ACTION.SET_EDITING_NOTE,
      payload: {
        noteId: note.id,
        text: note.text
      }
    });
    
    setIsMenuOpen(false);
  };

  const handleDelete = async () => {
    if (!dispatch) return;
    
    try {
      // Call the API to delete the note
      await fetchData(`/api/notes/${note.id}`, "DELETE");
      
      // Update the state to remove the deleted note
      dispatch({
        type: MINI_NOTES_ACTION.DELETE_NOTE,
        payload: note.id
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-gray-500 hover:text-blue-400 flex items-center justify-center w-8 h-8 focus:outline-none"
        aria-label="Menu"
      >
        <FontAwesomeIcon icon={faEllipsisH} className="w-3" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 mt-1 bg-gray-900 border border-zinc-800 rounded-md shadow-lg z-10 w-32">
          <ul className="py-1">
            <li>
              <button
                onClick={handleEdit}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="w-3 mr-2" />
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
              >
                <FontAwesomeIcon icon={faTrash} className="w-3 mr-2" />
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardMenu;