import { SparkIcon, SunIcon, MoonIcon, GithubIcon } from "./Icons";

export default function Header({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-canvas/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-[0_8px_20px_-8px_rgb(79_70_229/0.9)] transition-transform duration-300 group-hover:scale-105">
            <SparkIcon size={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight text-ink">
              Resume Analyzer
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
              AI match scoring
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost hidden !px-3 !py-2 sm:inline-flex"
            aria-label="View source on GitHub"
          >
            <GithubIcon size={18} />
            <span className="text-sm">GitHub</span>
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="btn btn-ghost !px-3 !py-2"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
