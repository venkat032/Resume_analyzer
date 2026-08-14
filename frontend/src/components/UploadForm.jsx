import { useRef, useState } from "react";
import { formatBytes, validateFile } from "../api";
import {
  AlertIcon,
  BriefcaseIcon,
  FileIcon,
  SparkIcon,
  UploadIcon,
  XIcon,
} from "./Icons";

const SAMPLE_JD = `Senior Backend Engineer (Python)

We are looking for a backend engineer to design and ship APIs that power our
data platform.

Requirements
- 4+ years building production services in Python
- Strong experience with FastAPI or Django, and PostgreSQL
- Docker, CI/CD and cloud deployment (AWS or GCP)
- Comfortable with REST API design, testing and code review
- Bonus: Redis, Kubernetes, LLM/OpenAI integrations`;

const MIN_JD_CHARS = 40;

export default function UploadForm({ file, onFileChange, jobDescription, onJobDescriptionChange, onSubmit, loading, error, onDismissError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState(null);

  const shownError = error || localError;
  const jdChars = jobDescription.trim().length;
  const ready = Boolean(file) && jdChars >= MIN_JD_CHARS;

  const acceptFile = (candidate) => {
    const message = validateFile(candidate);
    if (message) {
      setLocalError(message);
      return;
    }
    setLocalError(null);
    onDismissError?.();
    onFileChange(candidate);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) acceptFile(dropped);
  };

  const clearFile = (event) => {
    event.stopPropagation();
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setLocalError("Upload your resume to continue.");
      return;
    }
    if (jdChars < MIN_JD_CHARS) {
      setLocalError("Add a bit more of the job description — at least a couple of sentences.");
      return;
    }
    setLocalError(null);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-5 lg:gap-6">
      {/* Resume upload */}
      <section className="card card-hover animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] lg:col-span-2">
        <div className="card-header">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
            <FileIcon size={17} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink">Your resume</h2>
            <p className="text-xs text-ink-3">PDF, DOCX or DOC · up to 10 MB</p>
          </div>
        </div>

        <div className="card-body">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload your resume"
            className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
              dragging
                ? "border-brand-500 bg-brand-500/10 scale-[1.01]"
                : file
                  ? "border-emerald-500/60 bg-emerald-500/5"
                  : "border-line bg-surface-2 hover:border-brand-400 hover:bg-brand-500/5"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="sr-only"
              onChange={(e) => {
                const picked = e.target.files?.[0];
                if (picked) acceptFile(picked);
              }}
            />

            {file ? (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
                  <FileIcon size={24} />
                </span>
                <div className="min-w-0 max-w-full">
                  <p className="truncate px-2 text-sm font-semibold text-ink" title={file.name}>
                    {file.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-3">
                    {formatBytes(file.size)} · ready to analyze
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="btn btn-ghost !px-3 !py-1.5 !text-xs"
                >
                  <XIcon size={14} />
                  Remove
                </button>
              </>
            ) : (
              <>
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300 ${
                    dragging
                      ? "bg-brand-500 text-white"
                      : "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                  }`}
                >
                  <UploadIcon size={24} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {dragging ? "Drop it right here" : "Drag & drop your resume"}
                  </p>
                  <p className="mt-1 text-xs text-ink-3">
                    or <span className="font-medium text-brand-500">browse files</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Job description */}
      <section
        className="card card-hover animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] lg:col-span-3"
        style={{ animationDelay: "80ms" }}
      >
        <div className="card-header justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <BriefcaseIcon size={17} />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-ink">Job description</h2>
              <p className="text-xs text-ink-3">Paste the full posting for the sharpest match</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJobDescriptionChange(SAMPLE_JD)}
            className="btn btn-ghost !px-3 !py-1.5 !text-xs"
          >
            Use sample
          </button>
        </div>

        <div className="card-body">
          <textarea
            rows={11}
            value={jobDescription}
            onChange={(e) => {
              onJobDescriptionChange(e.target.value);
              setLocalError(null);
              onDismissError?.();
            }}
            placeholder="Paste the job title, responsibilities and required skills…"
            className="input resize-y font-[inherit]"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-ink-3">
            <span>Requirements and skill lists matter most.</span>
            <span className={jdChars >= MIN_JD_CHARS ? "text-emerald-500" : ""}>
              {jdChars.toLocaleString()} characters
            </span>
          </div>
        </div>
      </section>

      {/* Error + submit */}
      <div className="lg:col-span-5">
        {shownError && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-300 animate-[rise_0.3s_ease_both]"
          >
            <AlertIcon size={18} className="mt-px shrink-0" />
            <span className="flex-1">{shownError}</span>
            <button
              type="button"
              onClick={() => {
                setLocalError(null);
                onDismissError?.();
              }}
              className="shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
              aria-label="Dismiss error"
            >
              <XIcon size={16} />
            </button>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full !py-3.5 sm:w-auto sm:min-w-[280px]"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Analyzing your resume…
              </>
            ) : (
              <>
                <SparkIcon size={18} />
                Analyze match
              </>
            )}
          </button>
          {!loading && (
            <span className="text-xs text-ink-3">
              {ready ? "Everything's ready" : "Add a resume and a job description"}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
