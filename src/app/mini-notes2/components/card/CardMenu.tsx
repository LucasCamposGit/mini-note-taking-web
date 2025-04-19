interface CardMenuProps {
  children: React.ReactNode;
}

export default function CardMenu({ children }: CardMenuProps) {
  return (
    <div className="absolute right-0 top-8 mt-1 bg-gray-900/95 border border-zinc-700/60 
      rounded-lg shadow-lg z-10 w-36 overflow-hidden
      transition-all duration-150 ease-in-out
      transform origin-top-right scale-100
      backdrop-blur-sm">
      {children}
    </div>
  );
}
