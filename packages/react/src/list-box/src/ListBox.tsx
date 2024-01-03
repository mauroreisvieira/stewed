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
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const rootName = "list-box";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };
  return (
    <div className={cssClasses.root} role="menu" {...props}>
      {children}
    </div>
  );
}

// Compound component composition
ListBox.Item = ListBoxItem;
ListBox.Group = ListBoxGroup;
