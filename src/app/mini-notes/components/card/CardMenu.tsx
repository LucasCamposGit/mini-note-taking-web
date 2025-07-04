import { useEffect, useRef } from "react";
import { UI_ACTION } from "@/types/action";
import  useDispatch  from "../../context/DispatchContext";
import  useUI  from "../../context/UIContext";

interface CardMenuProps {
  children: React.ReactNode;
  noteId: number;
}

export default function CardMenu({ children, noteId }: CardMenuProps) {
  const dispatch = useDispatch();
  const ui = useUI();
  const menuRef = useRef<HTMLDivElement>(null);
  const isVisible = ui.noteCard.activeMenuId === noteId;
  
  useEffect(() => {
    // Handler for clicks outside the menu

    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Toggle the currently active menu by sending its ID
        dispatch({
          type: UI_ACTION.SET_ACTIVE_MENU,
          payload: null
        });
      }
    };
    
    // Add the event listener when menu is visible
    if (isVisible) {
      document.addEventListener('click', handleOutsideClick);
    }
    
    // Clean up event listener when component unmounts or menu closes
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, noteId]);

  if (!isVisible) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-8 mt-1 bg-gray-900/95 border border-zinc-700/60 
        rounded-lg shadow-lg w-36 overflow-hidden
        transition-all duration-150 ease-in-out
        transform origin-top-right scale-100
        backdrop-blur-sm z-50"
    >
      {children}
    </div>
  );
}
