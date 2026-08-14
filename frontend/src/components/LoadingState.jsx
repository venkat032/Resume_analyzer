import { useEffect, useState } from "react";

const STEPS = [
  "Reading your resume…",
  "Extracting skills and experience…",
  "Parsing the job requirements…",
  "Scoring the match…",
];

export default function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((current) => Math.min(current + 1, STEPS.length - 1));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <section className="card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="relative h-44 w-44 shrink-0">
            <span className="absolute inset-0 rounded-full border-[9px] border-line" />
            <span className="absolute inset-0 animate-spin rounded-full border-[9px] border-transparent border-t-brand-500 [animation-duration:1.4s]" />
            <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-ink-3">
              Analyzing
            </span>
          </div>
          <div className="w-full flex-1 space-y-4">
            <p className="text-center text-lg font-semibold text-ink lg:text-left">{STEPS[step]}</p>
            <ol className="space-y-2">
              {STEPS.map((label, index) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                    index <= step ? "text-ink-2" : "text-ink-3/60"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      index < step
                        ? "bg-emerald-500"
                        : index === step
                          ? "animate-pulse bg-brand-500"
                          : "bg-line"
                    }`}
                  />
                  {label}
                </li>
              ))}
            </ol>
            <p className="text-xs text-ink-3">
              First run can take a little longer while the API instance wakes up.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="card p-5">
            <div className="skeleton h-4 w-40" />
            <div className="mt-4 flex flex-wrap gap-2">
              {[64, 88, 52, 96, 72, 60].map((width, chipIndex) => (
                <div key={chipIndex} className="skeleton h-7 rounded-full" style={{ width }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
