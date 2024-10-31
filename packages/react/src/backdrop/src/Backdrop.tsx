import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface BackdropProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Whether to apply a blur effect to the backdrop. */
  blur?: boolean;
}

/**
 * Backdrop component to provide a overlay behind other content.
 *
 * @example
 * ```tsx
 * <Backdrop blur />
 * ```
 *
 * @remarks
 * This component extends `React.ComponentPropsWithoutRef<"div">`.
 *
 * @param {BackdropProps} props - The props for the Backdrop component.
 * @returns {React.ReactElement} - The rendered Backdrop component.
 */
export function Backdrop({ blur = false, className, ...props }: BackdropProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Backdrop, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [blur && "blur"],
      extraClasses: className,
    }),
  };

  return <div className={cssClasses.root} {...props} />;
}
