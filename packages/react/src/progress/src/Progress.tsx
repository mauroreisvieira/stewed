import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Skin } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ProgressProps extends React.ComponentPropsWithoutRef<"progress"> {
  /** Change the visual style of the progress bar. */
  skin?:
    | "white"
    | Extract<
        Skin,
        "primary" | "secondary" | "neutral" | "critical" | "success" | "info" | "warning"
      >;
  /** Changes the size of the progress bar, giving it more or less padding. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Allows the progress bar to have rounded corners. */
  rounded?: boolean;
  /** The total step count. */
  steps?: number;
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
 * @remarks This component props extended from React.ProgressHTMLAttributes<HTMLProgressElement>.
 *
 * @param {ProgressProps} props - The props for the Progress component.
 * @returns {React.ReactElement} - The rendered Progress component.
 */
export function Progress({
  skin = "primary",
  size = "sm",
  rounded = true,
  value,
  max = 100,
  steps,
  className,
  ...props
}: ProgressProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Progress, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin, size, rounded && "rounded"], extraClasses: className }),
    control: getElement(["control"]),
    wrapper: getElement(["wrapper"]),
    step: getElement(["step"]),
  };

  return (
    <div className={cssClasses.root}>
      <progress {...props} value={value} max={max} className={cssClasses.control} />
      {steps && (
        <div className={cssClasses.wrapper}>
          {Array.from({ length: steps + 1 }).map((_, index) => (
            <span
              className={cssClasses.step}
              key={index}
              style={{ left: `${(100 / steps) * index}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
