import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function AccordionItem({
  className,
  children,
  ...props
}: React.DetailsHTMLAttributes<HTMLDetailsElement>): React.ReactElement {
  const rootName = "accordion__item";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };

  return (
    <details className={cssClasses.root} {...props}>
      {children}
    </details>
  );
}
