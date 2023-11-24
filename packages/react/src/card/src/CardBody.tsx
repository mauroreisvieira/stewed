import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

export function CardBody({ className, children, ...props }: CardBodyProps): React.ReactElement {
  const rootClassName = "card__body";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
