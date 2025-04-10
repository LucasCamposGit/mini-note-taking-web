import Image from "next/image";

import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiniNotesInput from "./components/MiniNotesInput";

export default function MiniNotes() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-400 text-center">
          Mini Note-Taking
        </h1>

        <MiniNotesInput />

        <div className="note-card p-4 my-2 rounded-xl">
          <div className="flex">
            <div className="flex-grow">
              <p className="text-white mt-1 mb-2">This is a sample note.</p>
              <div className="flex justify-between items-center max-w-xs action-icons text-sm">
                <div className="flex items-center group cursor-pointer">
                  <FontAwesomeIcon
                    icon={["far", "comment"]}
                    className="mr-2 w-3 group-hover:text-blue-400"
                  />
                  <span className="group-hover:text-blue-400">3</span>
                </div>
              </div>
              <button className="text-sm text-gray-500 hover:text-blue-400 mt-2 flex items-center">
                <span className="mr-1 ">Show 3 replies</span>
                <FontAwesomeIcon icon={["fas", "chevron-down"]} className="w-3" />
              </button>
            </div>
          </div>

          <div className="replies-container mt-2 ml-12 pl-3">
            <div className="mt-3 pb-3 border-b border-gray-800">
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
        </div>
      </div>
    </main>
  );
}
