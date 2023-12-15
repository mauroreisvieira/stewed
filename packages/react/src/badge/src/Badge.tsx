import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  skin?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  value?: string;
  children?: React.ReactNode;
}

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
  };
  return (
    <div className={cssClasses.root}>
      {children}
      <span className={cssClasses.value}>{value}</span>
    </div>
  );
}
