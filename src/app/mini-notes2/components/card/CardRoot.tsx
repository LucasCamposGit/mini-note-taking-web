export default function CardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-700/50 p-5 my-3 rounded-xl backdrop-blur-sm transition-all hover:bg-gray-800/30 hover:border-gray-600/50 shadow-md relative group">
    {children}
  </div>
  );
}
