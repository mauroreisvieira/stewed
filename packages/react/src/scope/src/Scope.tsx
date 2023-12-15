import React from "react";
import { createPortal } from "react-dom";
// UI Components
import { Theme, useTheme } from "../../theme";
// Hooks
import { usePortal } from "@stewed/hooks";

export interface ScopeProps {
  children: React.ReactElement;
}

export function Scope({ children }: ScopeProps): React.ReactElement {
  const target = usePortal();

  const { theme, tokens } = useTheme();

  const content = (
    <Theme theme={theme} tokens={tokens}>
      {children}
    </Theme>
  );

  return createPortal(content, target);
}
