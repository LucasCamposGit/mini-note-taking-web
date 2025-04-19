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
      className="flex items-center w-full text-gray-400 hover:text-blue-400 p-2.5 rounded-md 
      transition-colors duration-150 ease-in-out hover:bg-blue-900/20 focus:outline-none 
      text-sm font-medium"
      onClick={onOptionClick}
    >
      <FontAwesomeIcon icon={icon} className="w-3 mr-2.5 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}
