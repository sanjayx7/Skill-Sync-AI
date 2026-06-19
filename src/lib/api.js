// Thin wrappers around the backend. In dev, Vite proxies /api to the
// local FastAPI server (see vite.config.js). In production on Vercel,
// /api is served by the Python serverless function automatically.

async function parseJsonOrThrow(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.detail || data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export async function parseResumeFile(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/parse-resume", { method: "POST", body: form });
  const data = await parseJsonOrThrow(res);
  return data.text;
}

export async function analyzeResume({ resumeText, jobDescText, targetRole, experienceLevel, focusArea }) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resume_text: resumeText,
      job_desc_text: jobDescText,
      target_role: targetRole,
      experience_level: experienceLevel,
      focus_area: focusArea,
    }),
  });
  return parseJsonOrThrow(res);
}
