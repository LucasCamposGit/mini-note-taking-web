import { Note } from "@/types/note";

interface CardReplyProps {
  children: React.ReactNode;
}

export default function CardReply({ children }: CardReplyProps) {
  return (
    <div className="ml-2 my-2 pl-3 bg-gray-900 rounded border-zinc-500 border-l relative">
      {children}
    </div>
  );
}
