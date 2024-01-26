import React from "react";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  /** Change the visual style of the progress bar. */
  skin?: "primary" | "neutral" | "success" | "critical";
  /** Changes the size of the progress bar, giving it more or less padding. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Allows the progress bar to have rounded corners. */
  rounded?: boolean;
}

/**
 * This component displays an progress component.
 * Bar displaying progress for a task that takes a long time or consists of several steps.
 *
 * @example
 * ```tsx
 * <Progress value={50} size="sm" />
 * ```
 *
 * @param props - ProgressProps
 * @remarks This component props extended from React.ProgressHTMLAttributes<HTMLProgressElement>.
 */
export const Progress = ({
  skin = "primary",
  size = "sm",
  rounded = true,
  value,
  max = 100,
  className,
  ...props
}: ProgressProps): React.ReactElement => {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Progress, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin, size, rounded && "rounded"], extraClasses: className }),
    control: getElement(["control"]),
  };

  return (
    <div className={cssClasses.root}>
      <progress {...props} value={value} max={max} className={cssClasses.control} />
    </div>
  );
};
