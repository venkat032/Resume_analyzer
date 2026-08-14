/** Maps a 0-100 match score to its colour ramp, label and text tone. */
export function scoreBand(score) {
  if (score >= 80) {
    return {
      key: "strong",
      label: "Strong match",
      from: "#10b981",
      to: "#34d399",
      text: "text-emerald-500",
    };
  }
  if (score >= 60) {
    return {
      key: "good",
      label: "Good match",
      from: "#f59e0b",
      to: "#fbbf24",
      text: "text-amber-500",
    };
  }
  if (score >= 35) {
    return {
      key: "fair",
      label: "Fair match",
      from: "#f97316",
      to: "#fb923c",
      text: "text-orange-500",
    };
  }
  return {
    key: "low",
    label: "Low match",
    from: "#f43f5e",
    to: "#fb7185",
    text: "text-rose-500",
  };
}
