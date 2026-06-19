import { useState } from "react";

export default function CoverLetterSection({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover_letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!text) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium p-6 text-center">
        <p className="text-sm text-slate-500 italic">No cover letter generated.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium overflow-hidden hover:shadow-glow hover:border-slate-300 transition-all duration-300">
      <div className="p-6 max-h-[30rem] overflow-y-auto bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-2xl mx-auto bg-white border border-slate-100 shadow-sm rounded-lg p-6 sm:p-8 text-[13.5px] leading-relaxed text-slate-700 font-sans whitespace-pre-wrap">
          {text}
        </div>
      </div>
      <div className="px-6 py-4 bg-slate-50 flex gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 font-outfit text-xs font-bold bg-white border border-slate-200 hover:border-accent hover:text-accent rounded-lg px-4 py-2 text-slate-700 shadow-sm transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {copied ? (
              <path d="M20 6L9 17l-5-5" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
          {copied ? "Copied!" : "Copy Text"}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 font-outfit text-xs font-bold bg-white border border-slate-200 hover:border-accent hover:text-accent rounded-lg px-4 py-2 text-slate-700 shadow-sm transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download .txt
        </button>
      </div>
    </div>
  );
}
