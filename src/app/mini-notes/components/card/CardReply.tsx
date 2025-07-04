interface CardReplyProps {
  children: React.ReactNode;
}

export default function CardReply({ children }: CardReplyProps) {
  return (
    <div className="ml-3 pl-3  
      border-zinc-600/30 border-l border-b relative
      transition-all duration-200 ease-in-out
      hover:bg-gray-800/80 hover:border-blue-700/20 
      before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full 
      before:bg-[#010b14] before:border before:border-zinc-600/50 
      before:left-[-0.3rem] before:bottom-0 before:transform before:translate-y-1/2
      before:z-10">
      {children}
    </div>
  );
}
