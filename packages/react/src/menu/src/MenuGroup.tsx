import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function MenuGroup({ className, title, children }: MenuGroupProps): React.ReactElement {
  const rootClassName = "menu__group";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
    title: classNames(styles[`${rootClassName}__title`]),
  };

  return (
    <div className={cssClasses.root}>
      {title && <div className={cssClasses.title}>{title}</div>}
      {children}
    </div>
  );
}
