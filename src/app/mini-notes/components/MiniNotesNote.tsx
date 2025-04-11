import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MiniNotesNote() {
  return (
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
  );
}
