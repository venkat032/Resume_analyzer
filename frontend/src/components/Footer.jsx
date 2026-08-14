export default function Footer() {
  return (
    <footer className="no-print border-t border-line/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-ink-3 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Resume Analyzer</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Analysis powered by an LLM — results are guidance, not a hiring decision.
        </p>
      </div>
    </footer>
  );
}
