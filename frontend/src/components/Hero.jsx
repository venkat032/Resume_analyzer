import { SparkIcon } from "./Icons";

const HIGHLIGHTS = [
  "Skill-by-skill gap analysis",
  "Instant match score",
  "Works with PDF & DOCX",
];

export default function Hero() {
  return (
    <div className="mx-auto max-w-3xl text-center animate-[rise_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-300">
        <SparkIcon size={14} />
        AI resume matching
      </span>

      <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
        See how your resume scores{" "}
        <span className="bg-gradient-to-r from-brand-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
          before you apply
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-2 sm:text-base">
        Upload a resume, paste the job description, and get a match score with the exact
        skills you have — and the ones the posting wants but your resume never mentions.
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-3">
        {HIGHLIGHTS.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
