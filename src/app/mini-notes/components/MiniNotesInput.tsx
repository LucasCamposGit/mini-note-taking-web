export default function MiniNotesInput() {
    return (
        <div className="p-4 rounded-xl note-card mb-4">
        <div className="flex">
          <div className="flex-grow">
            <textarea
              className="w-full p-2 rounded-lg resize-none border-0 bg-transparent note-input-area focus:outline-none text-white"
              placeholder="What's your deepest thought?"
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-400">0 / 280</div>
              <button className="btn-tweet py-1 px-4 rounded-full disabled:opacity-50">
                Take note
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}