import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface AccordionHeaderProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export function AccordionHeader({
  leftSlot,
  rightSlot,
  className,
  children,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  const rootName = "accordion__header";
  const cssClasses = {
    root: classNames(styles[rootName], className),
    left: classNames(styles[`${rootName}__left`]),
    right: classNames(styles[`${rootName}__right`]),
    text: classNames(styles[`${rootName}__text`]),
  };

  return (
    <summary className={cssClasses.root} {...props}>
        {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
        <div className={cssClasses.text}>{children}</div>
        {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </summary>
  );
}
