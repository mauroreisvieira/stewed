import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export type AccordionBodyProps = React.HTMLAttributes<HTMLDivElement>;

export function AccordionBody({ className, children, ...props }: AccordionBodyProps): React.ReactElement {
  const rootClassName = "Accordion__body";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
