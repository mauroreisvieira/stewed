import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface AccordionHeaderProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  leftSlot?: React.ReactNode;
}

export function AccordionHeader({
  leftSlot,
  className,
  children,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  const rootClassName = "accordion__header";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
    left: classNames(styles[`${rootClassName}__left`]),
  };

  return (
    <summary className={cssClasses.root} {...props}>
        {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
        {children}
    </summary>
  );
}
