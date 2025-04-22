interface CardReplyNoteProps {
  text: string;
}

export default function CardReplyNote({ text }: CardReplyNoteProps) {
  return (
    <p className="text-white/80 text-sm mt-2 mb-2 py-1 whitespace-pre-wrap break-words pr-8
      font-light leading-relaxed">
      {text}
    </p>
  );
}
