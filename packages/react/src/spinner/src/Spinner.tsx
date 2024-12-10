import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// UI Components
import { Icon } from "../../index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SpinnerProps extends React.ComponentPropsWithRef<"div"> {
  /** Change the visual style of the spinner. */
  skin?: "default" | "white" | "primary" | "secondary" | "neutral";
  /** Changes the size of the spinner. */
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

/**
 * Spinner component communicates progress without telling how long the process will take.
 *
 * @example
 * ```tsx
 * <Spinner size="sm" />
 * ```
 * @remarks This component props extended from React.HTMLAttributes<HTMLDivElement>.
 *
 * @param {SpinnerProps} props - The props for the Spinner component.
 * @returns {React.ReactElement} - The rendered Spinner component.
 */
export function Spinner({
  skin = "primary",
  size = "2xl",
  className,
  ...props
}: SpinnerProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Spinner, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin, size], extraClasses: className }),
    svg: getElement(["svg"]),
  };

  return (
    <div className={cssClasses.root} {...props}>
      <Icon.DotsScale className={cssClasses.svg} />
    </div>
  );
}
