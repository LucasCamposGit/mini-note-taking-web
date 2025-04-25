import { useRef } from "react";
import useNotes from "../../context/NotesContext";

interface CardRootProps {
  children: React.ReactNode;
  noteId: string | number;
}

export default function CardRoot({ children, noteId }: CardRootProps) {
  const notes = useNotes(); 
  const itemsLength = notes.items?.length || 0; 
  const rootRef = useRef<HTMLDivElement>(null);

  if (notes.items && noteId == notes.items[itemsLength - 1]?.id) {
    rootRef.current?.classList.add("border-b");
  }

  return (
    <div
      ref={rootRef}
      className="border-t border-x border-gray-700/50 p-5 backdrop-blur-sm 
      bg-gray-900/40 shadow-lg relative group
      transition-all duration-200 ease-in-out
      hover:bg-gray-800/50 hover:border-blue-600/30 hover:shadow-blue-900/10
      dark:hover:shadow-blue-900/5"
    >
      {children}
    </div>
  );
}
