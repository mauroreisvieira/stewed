import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface BadgeProps {
  skin?: "primary" | "secondary" | "info" | "success" | "warning" | "danger";
  count?: string;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  skin = "primary",
  count,
  className,
  children,
}: BadgeProps): React.ReactElement {
  const rootClassName = "badge";

  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      styles[`${rootClassName}--${skin}`],
      count && count.length > 2 && styles[`${rootClassName}--padded`],
      className,
    ),
    count: styles[`${rootClassName}__count`],
  };
  return (
    <div className={cssClasses.root}>
      {children}
      <span className={cssClasses.count}>{count}</span>
    </div>
  );
}
