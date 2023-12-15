import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export type CardMediaProps = React.HTMLAttributes<HTMLDivElement>;

export function CardMedia({ className, children, ...props }: CardMediaProps): React.ReactElement {
  const rootName = "card__media";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
