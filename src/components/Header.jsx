export default function Header() {
  return (
    <header className="h-16 bg-slate-950 text-white flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-cyan-400">
        VisionVoice AI
      </h1>

      <div className="flex items-center gap-4">

        <button className="bg-cyan-500 px-4 py-2 rounded-lg">
          Profile
        </button>

      </div>

    </header>
  );
}