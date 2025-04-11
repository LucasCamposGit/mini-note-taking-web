interface MiniNotesCardProps {
  children: React.ReactNode;
}

export default function MiniNotesCard({ children }: MiniNotesCardProps) {
  return (
    <div className="note-card p-4 my-2 rounded-xl">
      {children}
    </div>
  );
}