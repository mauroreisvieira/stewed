export const color = {
  // Global --------------------------------------------------------------------
  "text": "#000",
  "white": "#fff",
  // Backdrop --------------------------------------------------------------------
  "backdrop": "rgb(0 0 0 / 70%)",
  // Focus ---------------------------------------------------------------------
  "focus": "var(--color-primary-border)",
  // Neutral -------------------------------------------------------------------
  "neutral-faded": "#f8fafc",
  "neutral-border": "#e2e8f0",
  "neutral-border-hover": "#cbd5e1",
  "neutral": "#64748b",
  "neutral-pressed": "#475569",
  // Primary -------------------------------------------------------------------
  "primary-faded": "#eef2ff",
  "primary-border": "#c7d2fe",
  "primary": "#6366f1",
  "primary-pressed": "#4338ca",
  // Secondary -----------------------------------------------------------------
  "secondary-faded": "#efebe9",
  "secondary-border": "#d7ccc8",
  "secondary": "#795548",
  "secondary-pressed": "#6d4c41",
  // Critical ------------------------------------------------------------------
  "critical-faded": "#fef2f2",
  "critical-border": "#fee2e2",
  "critical": "#ef4444",
  "critical-pressed": "#b91c1c",
  // Success -------------------------------------------------------------------
  "success-faded": "#f0fdf4",
  "success-border": "#d1fae5",
  "success": "#10b981",
  "success-pressed": "#059669",
  // Info ----------------------------------------------------------------------
  "info-faded": "#eff6ff",
  "info-border": "#bfdbfe",
  "info": "#3b82f6",
  "info-pressed": "#2563eb",
  // Warning -------------------------------------------------------------------
  "warning-faded": "#fefce8",
  "warning-border": "#fef08a",
  "warning": "#ca8a04",
  "warning-pressed": "#ca8a04",
};

export type Color = keyof typeof color;
