function KeywordRow({ kw }) {
  const present = kw.status === "Present";
  
  const importanceColor = 
    kw.importance === "High" 
      ? "text-red-700 bg-red-50 border-red-100" 
      : kw.importance === "Medium"
      ? "text-amber-700 bg-amber-50 border-amber-100"
      : "text-slate-600 bg-slate-100 border-slate-200";

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className={`flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold shrink-0 ${present ? "text-teal-700 bg-teal-50" : "text-rose-700 bg-rose-50"}`}>
          {present ? "✓" : "✗"}
        </span>
        <span className={`text-[13.5px] font-medium truncate ${present ? "text-slate-800" : "text-slate-400 line-through decoration-rose-500/30"}`}>
          {kw.keyword}
        </span>
      </div>
      <span className={`font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${importanceColor} shrink-0`}>
        {kw.importance}
      </span>
    </div>
  );
}

export default function KeywordScan({ keywords }) {
  const present = keywords.filter((k) => k.status === "Present");
  const missing = keywords.filter((k) => k.status !== "Present");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Present Keywords
          </span>
          <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-100">
            {present.length} found
          </span>
        </div>
        <div className="space-y-1">
          {present.length ? (
            present.map((kw, i) => <KeywordRow key={i} kw={kw} />)
          ) : (
            <p className="text-xs text-slate-400 italic py-4 text-center">No matching keywords found in your resume.</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-rose-600">
            Missing Keywords
          </span>
          <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-100">
            {missing.length} missing
          </span>
        </div>
        <div className="space-y-1">
          {missing.length ? (
            missing.map((kw, i) => <KeywordRow key={i} kw={kw} />)
          ) : (
            <p className="text-xs text-teal-600 bg-teal-50 border border-teal-100 px-4 py-3 rounded-xl font-medium text-center">
              🎉 Perfect! All critical keywords are in your resume.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
