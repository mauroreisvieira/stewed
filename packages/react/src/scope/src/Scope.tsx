import React from "react";
import { createPortal } from "react-dom";
// UI Components
import { Theme, useTheme } from "../..";
// Hooks
import { useBem, usePortal } from "@stewed/hooks";
// Tokens
import { Elevation, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface ScopeProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Elevation level of the component. */
  elevation?: Elevation;
}

/**
 * The React Scope component serves as a wrapper responsible for managing the rendering of content
 * with a specified elevation level using React Portals.
 * It ensures that the content maintains its current elevation within the UI hierarchy.
 *
 * @example
 * ```tsx
 * <Scope elevation="hint" />
 * ```
 *
 * @param {ScopeProps} props - The props for the Scope component.
 * @returns {React.ReactElement} - The rendered Scope component.
 */
export function Scope({
  elevation,
  className,
  children,
  ...props
}: ScopeProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Scope, styles });

  // Managing portals
  const target = usePortal();

  // Access current theme and tokens
  const { theme, tokens, cssScope } = useTheme();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [`elevation-${elevation}`],
      extraClasses: className
    })
  };

  const content = (
    <Theme
      defaultTheme={theme}
      tokens={tokens}
      className={cssClasses.root}
      cssScope={cssScope}
      {...props}
    >
      {children}
    </Theme>
  );

  return createPortal(content, target);
}
