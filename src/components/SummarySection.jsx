function CheckRow({ check }) {
  const status = check.status || "Passed";
  const dot =
    status === "Passed" ? "bg-teal-500" : status === "Warning" ? "bg-amber-500" : "bg-rose-500";
  const text =
    status === "Passed" ? "text-teal-700 bg-teal-50" : status === "Warning" ? "text-amber-700 bg-amber-50" : "text-rose-700 bg-rose-50";

  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className={`mt-2 h-2 w-2 rounded-full shrink-0 ${dot}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13.5px] font-semibold text-slate-800">{check.check}</span>
          <span className={`font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${text}`}>
            {status}
          </span>
        </div>
        {check.feedback && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{check.feedback}</p>
        )}
      </div>
    </div>
  );
}

function NoteList({ items, tone }) {
  const isGood = tone === "signal";
  const bgBadge = isGood ? "bg-teal-500/10 text-teal-700" : "bg-rose-500/10 text-rose-700";
  
  if (!items?.length) {
    return <p className="text-xs text-slate-400 italic">Nothing flagged here.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-700">
          <span className={`flex items-center justify-center h-5 w-5 rounded-full ${bgBadge} font-sans font-bold text-xs shrink-0 mt-0.5`}>
            {isGood ? "✓" : "!"}
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SummarySection({ res }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
            Fit assessment
          </span>
          <p className="text-[14px] leading-relaxed text-slate-700">
            {res.analysis_summary}
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-3">
            Resume scan checks
          </span>
          <div className="divide-y divide-slate-100">
            {(res.ats_compatibility_checks || []).map((c, i) => (
              <CheckRow key={i} check={c} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-teal-50/50 border border-teal-500/10 rounded-xl p-6 shadow-sm">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-teal-700 block mb-3">
            Core alignments
          </span>
          <NoteList items={res.key_strengths} tone="signal" />
        </div>

        <div className="bg-rose-50/50 border border-rose-500/10 rounded-xl p-6 shadow-sm">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-rose-700 block mb-3">
            Critical action items
          </span>
          <NoteList items={res.critical_issues} tone="redline" />
        </div>
      </div>
    </div>
  );
}
