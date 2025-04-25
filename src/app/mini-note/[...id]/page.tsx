export default function MiniNote() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-light mb-6 text-center tracking-wide">
          Mini Note
        </h1>
        <div className="bg-zinc-800 rounded-lg p-4 my-4">
          {/* Note content would go here */}
          <p className="text-zinc-300">Note content loading...</p>
        </div>
      </div>
    </div>
  );
}