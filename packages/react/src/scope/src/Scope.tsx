import React from "react";
import { createPortal } from "react-dom";
// UI Components
import { Theme, useTheme } from "../..";
// Hooks
import { useBem, usePortal, type UsePortalProps } from "@stewed/hooks";
// Tokens
import { components, type Elevation } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/** Props for the `Scope` component, extending the native props of a `<div>` element. */
interface ScopeProps extends UsePortalProps, React.ComponentPropsWithoutRef<"div"> {
  /** Elevation level of the component. */
  elevation?: Elevation;
}

/**
 * The React Scope component serves as a wrapper responsible for managing the rendering of content with a specified elevation level using React Portals.
 * It ensures that the content maintains its current elevation within the UI hierarchy.
 *
 * @example
 * ```tsx
 * <Scope elevation="hint">Content</Scope>
 * ```
 *
 * @param props - The props for the Scope component.
 * @returns The rendered Scope component.
 *
 * @see {@link ScopeProps} for more details on the available props.
 */
export function Scope({ root, elevation, className, ...props }: ScopeProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Scope, styles });

  // Access current theme and tokens
  const { theme, tokens } = useTheme();

  // Managing portals
  const target = usePortal({ root });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [`elevation-${elevation}`],
      extraClasses: className
    })
  };

  const content = (
    <Theme defaultTheme={theme} tokens={tokens} cssScope={`scope-${crypto.randomUUID()}`} asChild>
      <div className={cssClasses.root} {...props} />
    </Theme>
  );

  return createPortal(content, target);
}
