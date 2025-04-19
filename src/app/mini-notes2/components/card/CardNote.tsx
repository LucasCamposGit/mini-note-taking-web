import { useMiniNotesContext } from "../../context";

interface CardNoteProps {
  text: string;
}

export default function CardNote({ text }: CardNoteProps) {
  return (
    <p className="text-white mt-1 mb-2 pr-6">{text}</p>
  );
}
