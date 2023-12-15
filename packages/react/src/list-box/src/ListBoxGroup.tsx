import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ListBoxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function ListBoxGroup({
  title,
  className,
  children,
}: ListBoxGroupProps): React.ReactElement {
  const rootName = "list-box__group";
  const cssClasses = {
    root: classNames(styles[rootName], className),
    title: classNames(styles[`${rootName}__title`]),
  };

  return (
    <div className={cssClasses.root}>
      {title && <div className={cssClasses.title}>{title}</div>}
      {children}
    </div>
  );
}
