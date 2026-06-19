import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import DocumentCard from "./components/DocumentCard";
import PreferencesBar from "./components/PreferencesBar";
import ScoreStrip from "./components/ScoreStrip";
import ReportSection from "./components/ReportSection";
import ReportNav, { SECTIONS } from "./components/ReportNav";
import SummarySection from "./components/SummarySection";
import KeywordScan from "./components/KeywordScan";
import SkillsGaps from "./components/SkillsGaps";
import BulletRewrites from "./components/BulletRewrites";
import CoverLetterSection from "./components/CoverLetterSection";
import InterviewPrep from "./components/InterviewPrep";
import ScanningIndicator from "./components/ScanningIndicator";
import { parseResumeFile, analyzeResume } from "./lib/api";
import { SAMPLES } from "./lib/samples";

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescText, setJobDescText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Not specified");
  const [focusArea, setFocusArea] = useState("Overall match");

  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("summary");

  const reportRef = useRef(null);

  async function handleFile(file) {
    setError("");
    setIsParsing(true);
    setFileName(file.name);
    try {
      const text = await parseResumeFile(file);
      setResumeText(text);
    } catch (err) {
      setError(err.message || "Could not read that file.");
    } finally {
      setIsParsing(false);
    }
  }

  async function handleScan() {
    setError("");
    if (!resumeText.trim()) {
      setError("Add your resume first — upload a file, paste the text, or choose a sample.");
      return;
    }
    if (!jobDescText.trim()) {
      setError("Paste the job description you're applying to.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeResume({
        resumeText,
        jobDescText,
        targetRole,
        experienceLevel,
        focusArea,
      });
      setAnalysis(result);
    } catch (err) {
      setError(err.message || "Could not complete the scan. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  // Scroll to the report once results land.
  useEffect(() => {
    if (analysis && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  // Track which report section is in view for the side nav.
  useEffect(() => {
    if (!analysis) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [analysis]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-accent-soft selection:text-accent">
      <TopBar />

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* ---------- HERO HEADER ---------- */}
        <div className="text-center max-w-2xl mx-auto space-y-3 py-4">
          <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none bg-gradient-to-r from-accent via-indigo-600 to-violet bg-clip-text text-transparent">
            SkillSync AI — Match Scanner & Auditor
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Drop in your resume and the target job description. The scanner analyzes both just like an Applicant Tracking System (ATS), highlighting critical improvements.
          </p>
        </div>

        {/* ---------- SAMPLE SELECTION ---------- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-outfit text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Or Try A Sample Candidate
            </h2>
            <span className="text-xs text-accent font-bold">Click to load data</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {SAMPLES.map((sample) => (
              <div 
                key={sample.id}
                onClick={() => {
                  setResumeText(sample.resumeText);
                  setJobDescText(sample.jobDescText);
                  setFileName("sample_" + sample.id + ".pdf");
                  setTargetRole(sample.role);
                  setExperienceLevel(sample.experienceLevel);
                  setFocusArea(sample.focusArea);
                  setError("");
                }}
                className="group relative bg-white border border-slate-200/80 hover:border-accent/40 rounded-2xl p-4 flex gap-4 cursor-pointer shadow-sm hover:shadow-premium transition-all duration-300 overflow-hidden"
              >
                <div className="w-16 h-20 rounded-lg border border-slate-100 overflow-hidden shrink-0 bg-slate-50 relative">
                  <img 
                    src={sample.image} 
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>
                <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                  <div className="space-y-0.5">
                    <h3 className="font-outfit text-sm font-bold text-slate-800 group-hover:text-accent transition-colors truncate">
                      {sample.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 font-medium line-clamp-2 leading-snug">
                      Quick load this pre-built resume and matching job description.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-accent-soft text-accent px-2 py-0.5 rounded border border-accent/10">
                      {sample.role}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {sample.experienceLevel}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0">
                  <span className="text-xs font-bold text-accent font-outfit flex items-center gap-0.5">
                    Load <span className="text-sm">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- INPUT CARDS ---------- */}
        <div className="grid md:grid-cols-2 gap-6">
          <DocumentCard
            exhibit="Resume Document"
            label="Resume (Text Content)"
            value={resumeText}
            onChange={setResumeText}
            placeholder="Paste your resume text here or drag in a file…"
            allowUpload
            onFile={handleFile}
            fileName={fileName}
            isParsing={isParsing}
          />
          <DocumentCard
            exhibit="Job Requirements"
            label="Target Job Description"
            value={jobDescText}
            onChange={setJobDescText}
            placeholder="Paste the job description, role requirements, and responsibilities…"
          />
        </div>

        {/* ---------- PREFERENCES ---------- */}
        <PreferencesBar
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          focusArea={focusArea}
          setFocusArea={setFocusArea}
        />

        {/* ---------- ACTIONS ---------- */}
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <button
            onClick={handleScan}
            disabled={isAnalyzing}
            className="font-outfit text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-accent to-indigo-600 hover:from-accent-hover hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAnalyzing ? "Analyzing Documents..." : "🚀 Run Match Scan"}
          </button>
          {isAnalyzing && <ScanningIndicator />}
          {error && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[13px] text-rose-700 font-semibold animate-fadeUp">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              {error}
            </div>
          )}
        </div>

        {/* ---------- REPORT ---------- */}
        {analysis && (
          <div ref={reportRef} className="pt-10 border-t border-slate-200 flex gap-10">
            <ReportNav active={activeSection} />

            <div className="flex-1 min-w-0 space-y-12">
              <div>
                <span className="font-outfit text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-3 pl-1">
                  ATS Scan Report
                </span>
                <ScoreStrip scores={analysis} />
              </div>

              <ReportSection index="01" title="Summary & Fit Assessment" id="summary">
                <SummarySection res={analysis} />
              </ReportSection>

              <ReportSection
                index="02"
                title="Keyword Scan"
                id="keywords"
                note={`${analysis.keyword_analysis?.length || 0} terms checked`}
              >
                <KeywordScan keywords={analysis.keyword_analysis || []} />
              </ReportSection>

              <ReportSection index="03" title="Skills Gaps Identified" id="gaps">
                <SkillsGaps gaps={analysis.skills_gap} />
              </ReportSection>

              <ReportSection index="04" title="Optimized Phrasing Rewrites" id="rewrites">
                <BulletRewrites
                  snippets={analysis.optimized_resume_snippets}
                  improvements={analysis.improvement_suggestions}
                />
              </ReportSection>

              <ReportSection index="05" title="Tailored Cover Letter" id="cover-letter">
                <CoverLetterSection text={analysis.cover_letter} />
              </ReportSection>

              <ReportSection index="06" title="ATS Interview Preparation" id="interview">
                <InterviewPrep questions={analysis.interview_questions} />
              </ReportSection>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 text-center text-xs text-slate-400 border-t border-slate-200/50 mt-16 font-medium">
        SkillSync AI — All reports are designed to simulate ATS logic and should serve as guidance.
      </footer>
    </div>
  );
}
