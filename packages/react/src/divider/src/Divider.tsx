import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import type { Spacings } from "../../tokens";
// Styles
import styles from "./styles/index.module.scss";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Change the visual style of the divider.
   * @default primary
   */
  skin?: "primary" | "secondary" | "danger";
  /** Adds space between divider on the horizontal and vertical axes. */
  space?: {
    x?: Spacings;
    y?: Spacings;
  };
  /**
   * Specifies the orientation of the divider.
   * @default horizontal
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * This component displays an divider component.
 * Divider component usually used for visually separating content.
 *
 * @example
 * ```tsx
 * <Divider skin="primary" space={{ x: 'sm', y: 'md' }} orientation="horizontal" />
 * ```
 *
 * @remarks This component props extended from React.HTMLAttributes<HTMLHRElement>.
 *
 * @param {DividerProps} props - The props for the Divider component.
 * @returns {React.ReactElement} - The rendered Divider component.
 */
export function Divider({
  skin = "secondary",
  space,
  orientation = "horizontal",
  className,
  ...props
}: DividerProps): React.ReactElement {
  const rootName = "divider";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      styles[`${rootName}--${orientation}`],
      space?.x && styles[`${rootName}--space-x-${space.x}`],
      space?.y && styles[`${rootName}--space-y-${space.y}`],
      className,
    ),
  };

  return <hr className={cssClasses.root} {...props} />;
}
