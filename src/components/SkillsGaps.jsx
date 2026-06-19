export default function SkillsGaps({ gaps }) {
  if (!gaps?.length) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6 text-center">
        <p className="text-sm text-slate-500 italic">No structural skills gaps identified. Your resume matches the job requirements perfectly!</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {gaps.map((g, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-5 border-l-4 border-l-rose-500 transition-all duration-300 hover:shadow-glow hover:border-slate-300"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[14px] font-bold text-slate-800">{g.skill}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shrink-0">
              {g.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{g.gap_description}</p>
        </div>
      ))}
    </div>
  );
}
