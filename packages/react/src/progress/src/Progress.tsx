import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  /** Change the visual style of the progress bar. */
  skin?: "primary" | "secondary" | "success";
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
  const rootName = "progress";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      styles[`${rootName}--${size}`],
      rounded && styles[`${rootName}--rounded`],
      className,
    ),
    control: styles[`${rootName}__control`],
  };
  return (
    <div className={cssClasses.root}>
      <progress {...props} value={value} max={max} className={cssClasses.control} />
    </div>
  );
};
