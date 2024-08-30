import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SpinnerProps extends React.ComponentPropsWithRef<"div"> {
  /** Change the visual style of the spinner. */
  skin?: "default" | Extract<Color, "white" | "primary" | "secondary" | "neutral">;
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
export const Spinner = forwardRef(function Root(
  { skin = "primary", size = "2xl", className, ...props }: SpinnerProps,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Spinner, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin, size], extraClasses: className }),
    svg: getElement(["svg"]),
  };

  return (
    <div ref={ref} className={cssClasses.root} {...props}>
      <svg className={cssClasses.svg} viewBox="0 0 48 48">
        <circle cx="24" cy="4" r="4" />
        <circle cx="12.19" cy="7.86" r="3.7" />
        <circle cx="5.02" cy="17.68" r="3.4" />
        <circle cx="5.02" cy="30.32" r="3.1" />
        <circle cx="12.19" cy="40.14" r="2.8" />
        <circle cx="24" cy="44" r="2.5" />
        <circle cx="35.81" cy="40.14" r="2.2" />
        <circle cx="42.98" cy="30.32" r="1.9" />
        <circle cx="42.98" cy="17.68" r="1.6" />
        <circle cx="35.81" cy="7.86" r="1.3" />
      </svg>
    </div>
  );
});
