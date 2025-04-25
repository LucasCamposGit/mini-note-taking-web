interface InputRootProps {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <div className="p-5 border-x border-t border-gray-700/50 backdrop-blur-sm shadow-lg transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
