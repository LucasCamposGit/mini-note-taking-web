export default function CardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-700/50 p-5 backdrop-blur-sm 
      bg-gray-900/40 shadow-lg relative group
      transition-all duration-200 ease-in-out
      hover:bg-gray-800/50 hover:border-blue-600/30 hover:shadow-blue-900/10
      dark:hover:shadow-blue-900/5">
      {children}
    </div>
  );
}
