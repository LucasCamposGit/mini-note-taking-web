import { useMiniNotesContext } from "../../context";

interface CardMenuProps {
  children: React.ReactNode;
  noteId: number;
}

export default function CardMenu({ children, noteId }: CardMenuProps) {
  const { state } = useMiniNotesContext();
  const isVisible = state.card.activeMenuId === noteId;

  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-8 mt-1 bg-gray-900/95 border border-zinc-700/60 
      rounded-lg shadow-lg w-36 overflow-hidden
      transition-all duration-150 ease-in-out
      transform origin-top-right scale-100
      backdrop-blur-sm">
      {children}
    </div>
  );
}
