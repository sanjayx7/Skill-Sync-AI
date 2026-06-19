import { useState } from "react";

function QuestionRow({ q, index, open, onToggle }) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-4 text-left group"
      >
        <span className="flex items-center justify-center font-mono text-xs font-bold text-accent bg-accent-soft h-6 w-8 rounded shrink-0">
          Q{index + 1}
        </span>
        <span className="text-[14px] text-slate-800 font-semibold flex-1 group-hover:text-accent transition-colors">
          {q.question}
        </span>
        <span className={`flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 group-hover:bg-accent-soft text-slate-500 group-hover:text-accent font-bold text-sm shrink-0 transition-all duration-200 transform ${open ? "rotate-180" : ""}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {open ? (
              <path d="M1 5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 pl-12 pr-6 animate-fadeUp">
          <div className="bg-gradient-to-r from-accent-soft to-indigo-50/30 border border-accent/10 rounded-xl p-4 shadow-sm">
            <span className="font-outfit text-[10px] font-extrabold uppercase tracking-widest text-accent block mb-1">
              Why they're asking & How to respond
            </span>
            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{q.rationale}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InterviewPrep({ questions }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!questions?.length) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6 text-center">
        <p className="text-sm text-slate-500 italic">No tailored interview questions generated.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium px-6 overflow-hidden">
      {questions.map((q, i) => (
        <QuestionRow
          key={i}
          q={q}
          index={i}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
