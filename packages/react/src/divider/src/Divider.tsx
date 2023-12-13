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
}

export function Divider({
  skin = "secondary",
  space,
  className,
  ...props
}: DividerProps): React.ReactElement {
  const rootName = "divider";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      space?.x && styles[`${rootName}--space-x-${space.x}`],
      space?.y && styles[`${rootName}--space-y-${space.y}`],
      className,
    ),
  };

  return <hr className={cssClasses.root} {...props} />;
}
