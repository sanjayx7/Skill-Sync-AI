function ScoreCell({ label, value, isLast }) {
  const tone = value >= 75 ? "text-signal" : value >= 50 ? "text-amber" : "text-redline";
  const barTone = value >= 75 ? "bg-gradient-to-r from-teal-500 to-emerald-500" : value >= 50 ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-rose-500 to-red-500";
  const bgTone = value >= 75 ? "bg-signal-soft" : value >= 50 ? "bg-amber-soft" : "bg-redline-soft";

  return (
    <div className={`flex-1 min-w-[140px] px-6 py-5 flex flex-col justify-between ${!isLast ? "border-r border-slate-100" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-outfit text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <span className={`inline-flex items-center justify-center font-mono text-2xl font-extrabold ${tone}`}>
          {value}<span className="text-xs font-normal text-slate-400 ml-0.5">%</span>
        </span>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${barTone} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-400 font-medium">ATS Target: 75%</span>
          <span className={`font-semibold px-1.5 py-0.2 rounded-full ${bgTone} ${tone}`}>
            {value >= 75 ? "Good" : value >= 50 ? "Warning" : "Critical"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ScoreStrip({ scores }) {
  const items = [
    { label: "ATS Score", value: scores.ats_score ?? 0 },
    { label: "Job Match", value: scores.match_percentage ?? 0 },
    { label: "Format Scan", value: scores.formatting_score ?? 0 },
    { label: "Keywords", value: scores.keyword_score ?? 0 },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium flex flex-wrap divide-y md:divide-y-0 overflow-hidden">
      {items.map((item, i) => (
        <ScoreCell key={item.label} {...item} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}
