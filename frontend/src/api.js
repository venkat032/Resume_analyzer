/**
 * API base URL. Override per environment with VITE_API_URL (see .env.example).
 * Falls back to the deployed backend so a plain `npm run build` still works.
 */
export const API_URL = (
  import.meta.env.VITE_API_URL || "https://resume-analyzer-g9kd.onrender.com"
).replace(/\/$/, "");

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".doc"];

const REQUEST_TIMEOUT_MS = 120_000;

export function validateFile(file) {
  if (!file) return "Please choose a resume file.";

  const name = file.name.toLowerCase();
  if (!ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "Unsupported file type. Upload a PDF, DOCX or DOC file.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return `That file is ${formatBytes(file.size)}. The limit is 10 MB.`;
  }
  if (file.size === 0) {
    return "That file looks empty.";
  }
  return null;
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function analyzeResume({ file, jobDescription, signal }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  if (signal) signal.addEventListener("abort", () => controller.abort(), { once: true });

  let response;
  try {
    response = await fetch(`${API_URL}/analyze-resume`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(
        "The request timed out. The analyzer service may be waking up — please try again."
      );
    }
    throw new Error(
      "Could not reach the analyzer service. Check your connection and try again."
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = payload?.detail;
    throw new Error(
      (typeof detail === "string" && detail) ||
        `Analysis failed (HTTP ${response.status}).`
    );
  }

  return payload;
}
