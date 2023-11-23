import React from "react";
// Compound Component
import { ActionListGroup } from "./ActionListGroup";
import { ActionListItem } from "./ActionListItem";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function ActionList({
  className,
  children,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const rootClassName = "action-list";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
  };
  return (
    <div className={cssClasses.root} role="menu" {...otherProps}>
      {children}
    </div>
  );
}

// Compound component composition
ActionList.Item = ActionListItem;
ActionList.Group = ActionListGroup;
