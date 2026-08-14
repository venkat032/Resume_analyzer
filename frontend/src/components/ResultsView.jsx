import { useMemo, useState } from "react";
import ScoreRing from "./ScoreRing";
import { scoreBand } from "../scoreBand";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  CodeIcon,
  CopyIcon,
  FileIcon,
  PrintIcon,
  TargetIcon,
  UsersIcon,
  XIcon,
} from "./Icons";

const VERDICTS = {
  strong: "Your resume lines up closely with this role. Tighten the wording on a few missing keywords and you are in great shape.",
  good: "A solid match. Closing the gaps below would move this resume into the top tier for this role.",
  fair: "Partial match. Several required skills are missing — surface any relevant experience you already have.",
  low: "Limited overlap with the posting. Consider tailoring the resume heavily, or targeting a closer role.",
};

function SkillPanel({ title, icon, tone, skills, emptyText, emptyTone = "muted", delay = 0 }) {
  const list = Array.isArray(skills) ? skills : [];

  return (
    <section
      className="card card-hover flex flex-col animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-header justify-between">
        <div className="flex items-center gap-3">
          <span className={`grid h-8 w-8 place-items-center rounded-lg ${tone.iconClass}`}>
            {icon}
          </span>
          <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
        </div>
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold tabular-nums text-ink-2">
          {list.length}
        </span>
      </div>
      <div className="card-body flex-1">
        {list.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {list.map((skill, index) => (
              <li
                key={`${skill}-${index}`}
                className={`chip ${tone.chipClass}`}
                style={{ animationDelay: `${Math.min(index * 25, 400)}ms` }}
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p
            className={`text-sm italic ${
              emptyTone === "good" ? "font-medium text-emerald-500 not-italic" : "text-ink-3"
            }`}
          >
            {emptyText}
          </p>
        )}
      </div>
    </section>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-3.5 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-3">{label}</p>
        <p className="truncate text-sm font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default function ResultsView({ result, fileName, onReset }) {
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);

  const analysis = result?.analysis || {};
  const score = result?.score || {};
  const requirements = result?.job_requirements?.required_skills || [];

  const numericScore = Number(score.score) || 0;
  const band = useMemo(() => scoreBand(numericScore), [numericScore]);
  const matched = score.matched_skills || [];
  const missing = score.missing_skills || [];

  const experience = Number(analysis.years_of_experience) || 0;
  const experienceLabel =
    experience > 0 ? `${experience % 1 === 0 ? experience : experience.toFixed(1)} years` : "Not stated";

  const copySummary = async () => {
    const lines = [
      `Resume match report — ${analysis.candidate_name || fileName || "Candidate"}`,
      `Match score: ${numericScore}% (${band.label})`,
      "",
      `Matched skills (${matched.length}): ${matched.join(", ") || "none"}`,
      `Missing skills (${missing.length}): ${missing.join(", ") || "none"}`,
      "",
      analysis.summary || "",
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onReset} className="btn btn-ghost">
          <ArrowLeftIcon size={17} />
          Analyze another
        </button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={copySummary} className="btn btn-ghost">
            {copied ? <CheckCircleIcon size={17} /> : <CopyIcon size={17} />}
            {copied ? "Copied" : "Copy summary"}
          </button>
          <button type="button" onClick={() => window.print()} className="btn btn-ghost">
            <PrintIcon size={17} />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Score hero */}
      <section className="card overflow-hidden animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(28rem 16rem at 12% 0%, ${band.from}22, transparent 70%)`,
            }}
          />
          <div className="relative flex flex-col items-center gap-8 p-6 sm:p-8 lg:flex-row lg:items-center">
            <ScoreRing score={numericScore} band={band} />

            <div className="min-w-0 flex-1 text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                Match report
              </p>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {analysis.candidate_name || fileName || "Your resume"}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                {VERDICTS[band.key]}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat
                  icon={<CheckCircleIcon size={17} />}
                  label="Skills matched"
                  value={`${matched.length} of ${requirements.length || matched.length + missing.length}`}
                />
                <Stat icon={<ClockIcon size={17} />} label="Experience" value={experienceLabel} />
                <Stat
                  icon={<FileIcon size={17} />}
                  label="Source file"
                  value={result?.filename || fileName || "Resume"}
                />
              </div>
            </div>
          </div>

          {/* Coverage bar */}
          <div className="relative border-t border-line px-6 py-4 sm:px-8">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-3">
              <span>Requirement coverage</span>
              <span className="tabular-nums">{numericScore}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(0, numericScore))}%`,
                  backgroundImage: `linear-gradient(90deg, ${band.from}, ${band.to})`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Candidate summary */}
      {analysis.summary && (
        <section
          className="card card-hover animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "60ms" }}
        >
          <div className="card-header">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <TargetIcon size={17} />
            </span>
            <h3 className="text-[15px] font-semibold text-ink">Professional summary</h3>
          </div>
          <div className="card-body">
            <p className="text-[15px] leading-relaxed text-ink-2">{analysis.summary}</p>
          </div>
        </section>
      )}

      {/* Skill panels */}
      <div className="grid gap-6 md:grid-cols-2">
        <SkillPanel
          title="Matched skills"
          delay={100}
          icon={<CheckCircleIcon size={17} />}
          tone={{ iconClass: "bg-emerald-500/10 text-emerald-500", chipClass: "chip-good" }}
          skills={matched}
          emptyText="No overlap found with the required skills yet."
        />
        <SkillPanel
          title="Missing skills"
          delay={140}
          icon={<XIcon size={17} />}
          tone={{ iconClass: "bg-rose-500/10 text-rose-500", chipClass: "chip-bad" }}
          skills={missing}
          emptyText="Every required skill is covered — nice."
          emptyTone="good"
        />
        <SkillPanel
          title="Technical skills on resume"
          delay={180}
          icon={<CodeIcon size={17} />}
          tone={{ iconClass: "bg-brand-500/10 text-brand-600 dark:text-brand-300", chipClass: "chip-neutral" }}
          skills={analysis.technical_skills}
          emptyText="No technical skills were detected."
        />
        <SkillPanel
          title="Soft skills on resume"
          delay={220}
          icon={<UsersIcon size={17} />}
          tone={{ iconClass: "bg-violet-500/10 text-violet-500", chipClass: "chip-muted" }}
          skills={analysis.soft_skills}
          emptyText="No soft skills were detected."
        />
      </div>

      <SkillPanel
        title="Skills the job asks for"
        delay={260}
        icon={<BriefcaseIcon size={17} />}
        tone={{ iconClass: "bg-amber-500/10 text-amber-500", chipClass: "chip-muted" }}
        skills={requirements}
        emptyText="No explicit requirements were extracted from the job description."
      />

      {/* Extracted text */}
      {result?.text && (
        <section className="card no-print animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
          <button
            type="button"
            onClick={() => setShowText((open) => !open)}
            className="card-header w-full cursor-pointer justify-between text-left"
            aria-expanded={showText}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-2 text-ink-2">
                <FileIcon size={17} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">Extracted resume text</h3>
                <p className="text-xs text-ink-3">What the analyzer actually read</p>
              </div>
            </div>
            <ChevronDownIcon
              size={18}
              className={`text-ink-3 transition-transform duration-300 ${showText ? "rotate-180" : ""}`}
            />
          </button>
          {showText && (
            <div className="card-body">
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-surface-2 p-4 text-xs leading-relaxed text-ink-2">
                {result.text}
              </pre>
            </div>
          )}
        </section>
      )}

      <div className="no-print flex justify-center pt-2">
        <button type="button" onClick={onReset} className="btn btn-primary">
          <ArrowLeftIcon size={17} />
          Analyze another resume
        </button>
      </div>
    </div>
  );
}
