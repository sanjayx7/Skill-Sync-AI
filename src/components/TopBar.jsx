export default function TopBar() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent to-violet flex items-center justify-center text-white font-outfit font-bold text-lg shadow-md shadow-accent/20">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-outfit text-base font-extrabold tracking-tight text-ink flex items-center gap-0.5">
              SkillSync<span className="text-accent">.</span>AI
            </span>
            <span className="text-[10px] text-muted font-mono leading-none">
              ATS MATCH INTEGRATOR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-soft text-accent border border-accent/10">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            v1.2 Live
          </span>
          <span className="text-xs text-muted font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            Screener Simulator
          </span>
        </div>
      </div>
    </header>
  );
}
