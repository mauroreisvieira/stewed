import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function CardFooter({
  bordered,
  className,
  children,
  ...props
}: CardFooterProps): React.ReactElement {
  const rootClassName = "card__footer";
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
