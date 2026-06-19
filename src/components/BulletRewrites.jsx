function RewriteCard({ snip }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-5 flex flex-col md:flex-row gap-5 hover:shadow-glow hover:border-slate-300 transition-all duration-300">
      <div className="flex-1 space-y-3.5">
        <div className="space-y-1">
          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">
            Original Phrasing
          </span>
          <p className="text-[13.5px] leading-relaxed text-slate-400 line-through decoration-rose-500/40">
            {snip.original}
          </p>
        </div>

        <div className="space-y-1">
          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
            Optimized Phrasing
          </span>
          <p className="text-[13.5px] leading-relaxed font-semibold text-slate-800">
            {snip.optimized}
          </p>
        </div>
      </div>

      <div className="md:w-64 shrink-0 bg-slate-50 rounded-lg p-3.5 border border-slate-100 flex flex-col justify-start">
        <span className="font-outfit text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
          Optimization Rationale
        </span>
        <p className="text-xs text-slate-500 leading-relaxed">
          {snip.rationale}
        </p>
      </div>
    </div>
  );
}

export default function BulletRewrites({ snippets, improvements }) {
  return (
    <div className="space-y-6">
      <div>
        {snippets?.length ? (
          <div className="space-y-4">
            {snippets.map((s, i) => (
              <RewriteCard key={i} snip={s} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No phrasing rewrites suggested.</p>
        )}
      </div>

      {improvements?.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-3">
            Formatting & Style Improvements
          </span>
          <ol className="divide-y divide-slate-100">
            {improvements.map((tip, i) => (
              <li key={i} className="flex gap-3 py-3 text-[13.5px] text-slate-700 leading-relaxed items-start first:pt-0 last:pb-0">
                <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{tip}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
