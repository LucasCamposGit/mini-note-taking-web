
interface CardNoteProps {
  text: string;
}

export default function CardNote({ text }: CardNoteProps) {
  return (
    <p className="text-white/90 font-light mt-2 mb-3 pr-8 leading-relaxed text-[15px] 
      whitespace-pre-wrap break-words">
      {text}
    </p>
  );
}
