import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export type TabsListProps = React.HTMLAttributes<HTMLElement>;

export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  const rootName = "tabs__list";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };

  return (
    <div className={cssClasses.root} role="tablist" {...props}>
      {children}
    </div>
  );
}
