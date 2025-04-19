import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardMenuToggleBtn() {
  return (
    <button
      // onClick={toggleMenu}
      className="text-gray-500 hover:text-blue-400 flex items-center justify-center w-8 h-8 focus:outline-none"
      aria-label="Menu"
    >
      <FontAwesomeIcon icon={faEllipsisH} className="w-3" />
    </button>
  );
}
