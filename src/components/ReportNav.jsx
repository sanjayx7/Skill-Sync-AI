const SECTIONS = [
  { id: "summary", index: "01", label: "Summary" },
  { id: "keywords", index: "02", label: "Keyword Scan" },
  { id: "gaps", index: "03", label: "Skills Gaps" },
  { id: "rewrites", index: "04", label: "Bullet Rewrites" },
  { id: "cover-letter", index: "05", label: "Cover Letter" },
  { id: "interview", index: "06", label: "Interview Prep" },
];

export default function ReportNav({ active }) {
  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="hidden lg:flex flex-col gap-1 sticky top-24 self-start w-48 shrink-0 pt-1">
      <span className="font-outfit text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 px-2">
        Report Sections
      </span>
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          className={`text-left font-sans text-xs font-semibold px-3 py-2 rounded-lg border-l-2 transition-all duration-200 ${
            active === s.id
              ? "border-accent text-accent bg-accent-soft font-bold shadow-sm"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300"
          }`}
        >
          <span className="font-mono text-[10px] opacity-75 mr-2">{s.index}</span>
          {s.label}
        </button>
      ))}
    </nav>
  );
}

export { SECTIONS };
