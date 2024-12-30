import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * The interface specifies the properties for a progress bar component.
 * It extends the standard attributes of the HTML `<progress>` element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress}
 * */
export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<"progress">, "children"> {
  /** Change the visual style of the progress bar. */
  skin?:
    | "white"
    | "primary"
    | "secondary"
    | "neutral"
    | "critical"
    | "success"
    | "info"
    | "warning";
  /** Changes the size of the progress bar, giving it more or less padding. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Change the visual appearance of the progress bar.
   * @default rounded
   */
  appearance?: "rounded" | "squared";
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
 * @see {@link ProgressProps} for more details on the available props.
 * @param props - The props for the Progress component.
 * @returns The rendered Progress component.
 */
export function Progress({
  skin = "primary",
  size = "sm",
  appearance = "rounded",
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
    root: getBlock({ modifiers: [skin, size, appearance], extraClasses: className }),
    control: getElement(["control"]),
    wrapper: getElement(["wrapper"]),
    step: getElement(["step"])
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
