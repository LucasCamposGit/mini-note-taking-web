import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardMenuToggleBtn() {
  return (
    <button
      // onClick={toggleMenu}
      className="absolute top-3 right-3 text-gray-500 hover:text-blue-400 
      flex items-center justify-center w-8 h-8 rounded-full
      transition-colors duration-150 ease-in-out
      hover:bg-gray-800/80 focus:outline-none"
      aria-label="Menu"
    >
      <FontAwesomeIcon icon={faEllipsisH} className="w-3" />
    </button>
  );
}
