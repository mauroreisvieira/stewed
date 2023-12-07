import React from "react";
// Compound Component
import { AccordionHeader } from "./AccordionHeader";
import { AccordionBody } from "./AccordionBody";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function Accordion({
  className,
  children,
  ...props
}: React.DetailsHTMLAttributes<HTMLDetailsElement>): React.ReactElement {
  const rootClassName = "accordion";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      className,
    ),
  };

  return (
    <details className={cssClasses.root} {...props}>
      {children}
    </details>
  );
}

// Compound component composition
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

