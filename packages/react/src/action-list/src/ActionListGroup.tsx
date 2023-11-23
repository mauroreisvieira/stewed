import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ActionListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function ActionListGroup({
  className,
  title,
  children,
}: ActionListGroupProps): React.ReactElement {
  const rootClassName = "action-list__group";
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
