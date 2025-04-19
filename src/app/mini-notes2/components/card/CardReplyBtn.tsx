import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardReplyBtnProps {

}

export default function CardReplyBtn() {
  return (
    <button
      // onClick={toggleReplyForm}
      className="flex items-center group cursor-pointer text-gray-500 hover:text-blue-400"
    >
      <FontAwesomeIcon
        icon={faComment}
        className="mr-2 w-3 group-hover:text-blue-400"
      />

    </button>
  );
}
