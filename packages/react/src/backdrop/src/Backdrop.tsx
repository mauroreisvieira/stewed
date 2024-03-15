import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface BackdropProps extends React.ComponentPropsWithRef<"div"> {}

/**
 * Backdrop component to provide a overlay behind other content.
 *
 * @example
 * ```tsx
 * <Backdrop />
 * ```
 *
 * @remarks
 * This component extends `ReactDialogHTMLAttributes<HTMLDivElement>`.
 *
 * @param {BackdropProps} props - The props for the Backdrop component.
 * @returns {React.ReactElement} - The rendered Backdrop component.
 */
export function Backdrop({ className, ...props }: BackdropProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Backdrop, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
  };

  return <div className={cssClasses.root} {...props} />;
}
