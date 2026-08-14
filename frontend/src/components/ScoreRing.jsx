import { useEffect, useRef, useState } from "react";
import { scoreBand } from "../scoreBand";

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Animated circular gauge with a count-up number. */
export default function ScoreRing({ score = 0, size = 176, band }) {
  const target = Math.max(0, Math.min(100, Number(score) || 0));
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);
  const tone = band || scoreBand(target);
  const gradientId = `score-gradient-${tone.key}`;

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }

    const duration = 1100;
    let start = null;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(target * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  const offset = CIRCUMFERENCE * (1 - value / 100);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Match score ${target.toFixed(0)} out of 100 — ${tone.label}`}
    >
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tone.from} />
            <stop offset="100%" stopColor={tone.to} />
          </linearGradient>
        </defs>
        <circle
          cx="55"
          cy="55"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          className="text-line"
          strokeWidth="9"
        />
        <circle
          cx="55"
          cy="55"
          r={RADIUS}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 10px ${tone.from}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tabular-nums tracking-tight text-ink">
          {Math.round(value)}
          <span className="text-xl font-semibold text-ink-3">%</span>
        </span>
        <span className={`mt-0.5 text-xs font-semibold uppercase tracking-wider ${tone.text}`}>
          {tone.label}
        </span>
      </div>
    </div>
  );
}
