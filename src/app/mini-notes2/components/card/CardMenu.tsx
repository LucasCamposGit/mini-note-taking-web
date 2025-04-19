interface CardMenuProps {
  children: React.ReactNode;
}

export default function CardMenu({ children }: CardMenuProps) {
  return (
    <div className="absolute right-0 top-8 mt-1 bg-gray-900 border border-zinc-800 rounded-md shadow-lg z-10 w-32">
      {children}
    </div>
  );
}
