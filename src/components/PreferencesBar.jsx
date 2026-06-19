function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 flex-1 min-w-[200px]">
      <span className="font-outfit text-xs font-bold text-slate-600 mb-1">
        {label}
      </span>
      <div className="relative w-full flex items-center">
        {children}
      </div>
    </label>
  );
}

const selectClass =
  "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-800 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all appearance-none cursor-pointer shadow-sm";

const inputClass =
  "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-800 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-slate-400 shadow-sm";

export default function PreferencesBar({
  targetRole,
  setTargetRole,
  experienceLevel,
  setExperienceLevel,
  focusArea,
  setFocusArea,
}) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-premium px-5 py-5 flex flex-wrap gap-5 items-end">
      <Field label="Target role (optional)">
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Backend Developer"
          className={inputClass}
        />
      </Field>

      <Field label="Experience level">
        <div className="relative w-full">
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className={selectClass}
          >
            <option>Not specified</option>
            <option>Student / Fresher</option>
            <option>Entry level</option>
            <option>Mid level</option>
            <option>Senior level</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </Field>

      <Field label="Main focus">
        <div className="relative w-full">
          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className={selectClass}
          >
            <option>Overall match</option>
            <option>Missing keywords</option>
            <option>Resume wording</option>
            <option>Interview preparation</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </Field>
    </div>
  );
}
