export default function MiniNotesReply() {
  return (
    <div className="replies-container mt-2 ml-12 pl-3">
      <div className="mt-3 pb-3">
        <div className="flex">
          <div className="flex-grow">
            <p className="text-white text-sm mt-1">
              This is a reply to the note.
            </p>
            <div className="flex space-x-8 mt-1 action-icons text-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
