interface InputRootProps {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <div className="p-4 rounded-xl border border-gray-700 mb-4">
      <div className="flex">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
