import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeResume } from "./api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import UploadForm from "./components/UploadForm";
import LoadingState from "./components/LoadingState";
import ResultsView from "./components/ResultsView";

const THEME_KEY = "resume-analyzer-theme";

function readInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(readInitialTheme);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    []
  );

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const data = await analyzeResume({ file, jobDescription });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="app-backdrop" aria-hidden="true" />
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div ref={topRef} className="mx-auto max-w-6xl scroll-mt-24">
          {loading ? (
            <LoadingState />
          ) : result ? (
            <ResultsView result={result} fileName={file?.name} onReset={handleReset} />
          ) : (
            <>
              <Hero />
              <div className="mt-10 sm:mt-12">
                <UploadForm
                  file={file}
                  onFileChange={setFile}
                  jobDescription={jobDescription}
                  onJobDescriptionChange={setJobDescription}
                  onSubmit={handleAnalyze}
                  loading={loading}
                  error={error}
                  onDismissError={() => setError(null)}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
