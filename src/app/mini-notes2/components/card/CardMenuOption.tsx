import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardMenuOptionProps {
  icon: IconDefinition;
  label: string;
  onOptionClick: () => void;
}

export default function CardMenuOption({
  icon,
  label,
  onOptionClick,
}: CardMenuOptionProps) {
  return (
    <button
      className="flex items-center text-gray-700 hover:text-blue-400 p-2 rounded-md focus:outline-none"
      onClick={onOptionClick}
    >
       <FontAwesomeIcon icon={icon} className="w-3 mr-2" />
      <span className="ml-2">{label}</span>
    </button>
  );
}
