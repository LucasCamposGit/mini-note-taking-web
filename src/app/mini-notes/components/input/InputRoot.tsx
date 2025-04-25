interface InputRootProps {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <div className="p-5 border border-blue-800 backdrop-blur-sm shadow-lg transition-all hover:border-blue-500 focus-within:border-blue-500/50">
      <div className="flex flex-col gap-3">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
