export default function ScanningIndicator() {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
      <span className="relative inline-block h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-accent to-violet rounded-full animate-[scanx_1.1s_ease-in-out_infinite]" />
      </span>
      <span className="font-semibold text-slate-600">Scanning document...</span>
      <style>{`
        @keyframes scanx {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
