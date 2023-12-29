import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Skin color of the badge.
   * @default "primary"
   */
  skin?: "primary" | "neutral" | "info" | "success" | "warning" | "critical";
  /**
   * Position of the badge.
   * @default "top-right"
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Value displayed on the badge. */
  value?: string;
  /** Content inside the badge. */
  children?: React.ReactNode;
}

/**
 * This component displays an badge component.
 * Badge consists of a small circle notification element.
 *
 * @example
 * ```tsx
 * <Badge value="10" skin="neutral" />
 * ```
 *
 * @param {BadgeProps} props - The props for the Badge component.
 * @returns {React.ReactElement} - The rendered Badge component.
 */
export function Badge({
  skin = "primary",
  position = "top-right",
  value,
  className,
  children,
}: BadgeProps): React.ReactElement {
  const rootName = "badge";

  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      !!children && styles[`${rootName}--${position}`],
      value && value.length > 2 && styles[`${rootName}--padded`],
      className,
    ),
    value: styles[`${rootName}__value`],
    text: styles[`${rootName}__text`],
  };

  return (
    <div className={cssClasses.root}>
      {children}
      <span className={cssClasses.value}>{value}</span>
    </div>
  );
}
