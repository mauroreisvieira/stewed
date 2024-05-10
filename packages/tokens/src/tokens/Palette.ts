export const palette = {
  // Primary -------------------------------------------------------------------
  "primary-100": "color-mix(in oklab, var(--color-primary) 10%, white)",
  "primary-200": "color-mix(in oklab, var(--color-primary) 20%, white)",
  "primary-300": "color-mix(in oklab, var(--color-primary) 30%, white)",
  "primary-400": "color-mix(in oklab, var(--color-primary) 40%, white)",
  "primary": "#6366f1",
  "primary-600": "color-mix(in oklab, var(--color-primary) 90%, black)",
  "primary-700": "color-mix(in oklab, var(--color-primary) 80%, black)",
  "primary-800": "color-mix(in oklab, var(--color-primary) 70%, black)",
  "primary-900": "color-mix(in oklab, var(--color-primary) 60%, black)",
  // Neutral -------------------------------------------------------------------
  "neutral-100": "color-mix(in oklab, var(--color-neutral) 5%, white)",
  "neutral-200": "color-mix(in oklab, var(--color-neutral) 10%, white)",
  "neutral-300": "color-mix(in oklab, var(--color-neutral) 20%, white)",
  "neutral-400": "color-mix(in oklab, var(--color-neutral) 30%, white)",
  "neutral": "#64748b",
  "neutral-600": "color-mix(in oklab, var(--color-neutral) 90%, black)",
  "neutral-700": "color-mix(in oklab, var(--color-neutral) 80%, black)",
  "neutral-800": "color-mix(in oklab, var(--color-neutral) 70%, black)",
  "neutral-900": "color-mix(in oklab, var(--color-neutral) 60%, black)",
  // Secondary -----------------------------------------------------------------
  "secondary-100": "color-mix(in oklab, var(--color-secondary) 10%, white)",
  "secondary-200": "color-mix(in oklab, var(--color-secondary) 20%, white)",
  "secondary-300": "color-mix(in oklab, var(--color-secondary) 30%, white)",
  "secondary-400": "color-mix(in oklab, var(--color-secondary) 40%, white)",
  "secondary": "#e91e63",
  "secondary-600": "color-mix(in oklab, var(--color-secondary) 90%, black)",
  "secondary-700": "color-mix(in oklab, var(--color-secondary) 80%, black)",
  "secondary-800": "color-mix(in oklab, var(--color-secondary) 70%, black)",
  "secondary-900": "color-mix(in oklab, var(--color-secondary) 60%, black)",
  // Critical ------------------------------------------------------------------
  "critical-100": "color-mix(in oklab, var(--color-critical) 10%, white)",
  "critical-200": "color-mix(in oklab, var(--color-critical) 20%, white)",
  "critical-300": "color-mix(in oklab, var(--color-critical) 30%, white)",
  "critical-400": "color-mix(in oklab, var(--color-critical) 40%, white)",
  "critical": "#ef4444",
  "critical-600": "color-mix(in oklab, var(--color-critical) 90%, black)",
  "critical-700": "color-mix(in oklab, var(--color-critical) 80%, black)",
  "critical-800": "color-mix(in oklab, var(--color-critical) 70%, black)",
  "critical-900": "color-mix(in oklab, var(--color-critical) 60%, black)",
  // Success -------------------------------------------------------------------
  "success-100": "color-mix(in oklab, var(--color-success) 10%, white)",
  "success-200": "color-mix(in oklab, var(--color-success) 20%, white)",
  "success-300": "color-mix(in oklab, var(--color-success) 30%, white)",
  "success-400": "color-mix(in oklab, var(--color-success) 40%, white)",
  "success": "#10b981",
  "success-600": "color-mix(in oklab, var(--color-success) 90%, black)",
  "success-700": "color-mix(in oklab, var(--color-success) 80%, black)",
  "success-800": "color-mix(in oklab, var(--color-success) 70%, black)",
  "success-900": "color-mix(in oklab, var(--color-success) 60%, black)",
  // Info ----------------------------------------------------------------------
  "info-100": "color-mix(in oklab, var(--color-info) 10%, white)",
  "info-200": "color-mix(in oklab, var(--color-info) 20%, white)",
  "info-300": "color-mix(in oklab, var(--color-info) 30%, white)",
  "info-400": "color-mix(in oklab, var(--color-info) 40%, white)",
  "info": "#3b82f6",
  "info-600": "color-mix(in oklab, var(--color-info) 90%, black)",
  "info-700": "color-mix(in oklab, var(--color-info) 80%, black)",
  "info-800": "color-mix(in oklab, var(--color-info) 70%, black)",
  "info-900": "color-mix(in oklab, var(--color-info) 60%, black)",
  // Warning -------------------------------------------------------------------
  "warning-100": "color-mix(in oklab, var(--color-warning) 10%, white)",
  "warning-200": "color-mix(in oklab, var(--color-warning) 20%, white)",
  "warning-300": "color-mix(in oklab, var(--color-warning) 30%, white)",
  "warning-400": "color-mix(in oklab, var(--color-warning) 40%, white)",
  "warning": "#ca8a04",
  "warning-600": "color-mix(in oklab, var(--color-warning) 90%, black)",
  "warning-700": "color-mix(in oklab, var(--color-warning) 80%, black)",
  "warning-800": "color-mix(in oklab, var(--color-warning) 70%, black)",
  "warning-900": "color-mix(in oklab, var(--color-warning) 60%, black)",
};

export type Palette = keyof typeof palette;