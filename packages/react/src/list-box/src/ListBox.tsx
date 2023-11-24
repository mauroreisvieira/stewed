import React from "react";
// Compound Component
import { ListBoxGroup } from "./ListBoxGroup";
import { ListBoxItem } from "./ListBoxItem";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function ListBox({
  className,
  children,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const rootClassName = "list-box";
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
ListBox.Item = ListBoxItem;
ListBox.Group = ListBoxGroup;
