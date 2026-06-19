import { useRef, useState } from "react";

export default function DocumentCard({
  label,
  exhibit,
  value,
  onChange,
  placeholder,
  allowUpload,
  onFile,
  fileName,
  isParsing,
  height = "h-64",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files) {
    const file = files?.[0];
    if (file && onFile) onFile(file);
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium hover:shadow-glow hover:border-accent/30 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-slate-200/60 text-slate-600 font-mono">
          {exhibit}
        </span>
        <span className="font-outfit text-[13px] text-slate-800 font-bold tracking-tight">{label}</span>
      </div>

      {allowUpload && (
        <div className="px-4 pt-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border-2 border-dashed px-4 py-3 cursor-pointer transition-all duration-300 ${
              dragOver 
                ? "border-accent bg-accent-soft/50 shadow-inner scale-[0.99]" 
                : "border-slate-200 hover:border-accent hover:bg-accent-soft/20 bg-slate-50/20"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg ${dragOver ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-slate-500'} transition-colors`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M12 16V4M12 4L7 9M12 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {isParsing
                    ? "Extracting PDF/Word text..."
                    : fileName
                    ? fileName
                    : "Upload your resume file"}
                </span>
                <span className="text-[10px] text-muted truncate">
                  PDF, DOCX, or TXT formats supported
                </span>
              </div>
            </div>
            <button 
              type="button" 
              className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent bg-accent-soft hover:bg-accent hover:text-white px-3 py-1.5 rounded transition-all duration-200 shrink-0"
            >
              Browse
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${height} w-full resize-none bg-transparent px-4 py-3 text-[13.5px] leading-relaxed text-ink font-sans outline-none placeholder:text-slate-400 focus:placeholder:text-slate-300 transition-colors`}
      />

      <div className="border-t border-slate-100 bg-slate-50/30 px-4 py-2 flex justify-between items-center text-[10px] text-muted font-mono">
        <span>Character Count</span>
        <span>
          {value.trim().length.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
}
