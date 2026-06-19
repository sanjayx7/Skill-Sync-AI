export default function ReportSection({ index, title, id, children, note }) {
  return (
    <section id={id} className="scroll-mt-24 animate-fadeUp">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2.5 py-1 rounded-md">{index}</span>
        <h2 className="font-outfit text-base font-extrabold tracking-tight text-slate-800">
          {title}
        </h2>
        <span className="flex-1 border-t border-slate-200/80" />
        {note && <span className="font-mono text-[10px] text-muted bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{note}</span>}
      </div>
      <div className="transition-all duration-300">
        {children}
      </div>
    </section>
  );
}
