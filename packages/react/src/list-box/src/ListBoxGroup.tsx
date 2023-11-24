import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ListBoxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  border?: boolean;
}

export function ListBoxGroup({
  title,
  border = true,
  className,
  children,
}: ListBoxGroupProps): React.ReactElement {
  const rootClassName = "list-box__group";
  const cssClasses = {
    root: classNames(styles[rootClassName], border && styles[`${rootClassName}--border`], className),
    title: classNames(styles[`${rootClassName}__title`]),
  };

  return (
    <div className={cssClasses.root}>
      {title && <div className={cssClasses.title}>{title}</div>}
      {children}
    </div>
  );
}
