interface CardReplyNoteProps {
  text: string;
}

export default function CardReplyNote({ text }: CardReplyNoteProps) {
  return (
    <p className="text-white text-sm mt-1 whitespace-pre-wrap break-words pr-6">
      {text}
    </p>
  );
}
