export default function MiniNotesInput() {
  return (
    <div className="p-4 rounded-xl note-card mb-4">
      <div className="flex">
        <div className="flex-grow">
          <div className="relative">
            <textarea
              className="w-full p-2 rounded-lg resize-none border-0 bg-transparent text-sm text-white placeholder-transparent focus:outline-none peer"
              placeholder="Write your deepest thought — begin with a whisper"
            ></textarea>
            <div className="absolute top-2 left-2 pointer-events-none text-sm peer-focus:hidden">
              <span className="text-zinc-400">Write your deepest thought</span>{" "}
              <span className="text-zinc-500">— begin with a whisper</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-400">0 / 280</div>
            <button className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50">
              Take note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
