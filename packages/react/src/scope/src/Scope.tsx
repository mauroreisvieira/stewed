import React, { Children } from "react";
import { createPortal } from "react-dom";
// UI Components
import { Theme, useTheme } from "../../theme";
// Hooks
import { useBem, usePortal } from "@stewed/hooks";
// Tokens
import { Elevation, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ScopeProps {
  className?: string;
  elevation?: Elevation;
  children?: React.ReactNode;
}

export function Scope({ elevation, className, children }: ScopeProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Scope, styles });

  const target = usePortal();

  const { theme, tokens } = useTheme();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [`elevation-${elevation}`],
      extraClasses: className,
    }),
  };

  const content = (
    <Theme defaultTheme={theme} tokens={tokens} className={cssClasses.root}>
      {children}
    </Theme>
  );

  return createPortal(content, target);
}
