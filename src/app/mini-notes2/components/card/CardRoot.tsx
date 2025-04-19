export default function CardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-700 p-4 my-2 rounded-xl">
      {children}
    </div>
  );
}
