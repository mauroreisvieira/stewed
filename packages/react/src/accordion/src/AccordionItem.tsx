import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface AccordionItemProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** The controlled open state of the dialog.  */
  open?: boolean;
}

export function AccordionItem({
  className,
  children,
  ...props
}: AccordionItemProps): React.ReactElement {
  const rootName = "accordion__item";
  const cssClasses = {
    root: classNames(styles[rootName], props.open && styles[`${rootName}--open`], className),
  };

  return (
    <details className={cssClasses.root} {...props}>
      {children}
    </details>
  );
}
