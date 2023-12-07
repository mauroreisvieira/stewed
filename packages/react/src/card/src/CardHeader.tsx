import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function CardHeader({
  bordered,
  className,
  children,
  ...props
}: CardHeaderProps): React.ReactElement {
  const rootClassName = "card__header";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      bordered && styles[`${rootClassName}--bordered`],
      className,
    ),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
