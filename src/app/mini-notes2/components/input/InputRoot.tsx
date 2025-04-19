interface InputRootProps {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <div className="p-5 rounded-xl border border-blue-700/30 mb-6  backdrop-blur-sm shadow-lg transition-all hover:border-blue-600/40 focus-within:border-blue-500/50">
      <div className="flex flex-col gap-3">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
