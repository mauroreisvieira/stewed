export const color = {
  "text": "#000",
  "text-inverse": "#fff",
  // primary
  "primary-faded": "#eef2ff",
  "primary": "#6366f1",
  "primary-pressed": "#4338ca",
  "primary-border": "#c7d2fe",
  // neutral
  "neutral-faded": "#f8fafc",
  "neutral": "#64748b",
  "neutral-pressed": "#334155",
  "neutral-border": "#e2e8f0",
  "neutral-border-hover": "#cbd5e1",
  // critical
  "critical-faded": "#fef2f2",
  "critical": "#ef4444",
  "critical-pressed": "#b91c1c",
  "critical-border": "#fecaca",
  // success
  "success-faded": "#f0fdf4",
  "success": "#22c55e",
  "success-pressed": "#15803d",
  "success-border": "#bbf7d0",
  // info
  "info-faded": "#eff6ff",
  "info": "#3b82f6",
  "info-pressed": "#1d4ed8",
  "info-border": "#bfdbfe",
  // warning
  "warning-faded": "#fefce8",
  "warning": "#eab308",
  "warning-pressed": "#854d0e",
  "warning-border": "#fef08a",
};

type Skin = "primary" | "neutral" | "critical" | "info" | "success" | "warning";

type Colors = Record<
  Skin,
  Partial<{
    faded: string;
    default: string;
    pressed: string;
    border: string;
  }>
>;

export const test: Colors = {
  info: {
    faded: "#ff",
  },
};
