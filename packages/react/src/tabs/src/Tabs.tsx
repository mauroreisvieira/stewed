import React from "react";
// Context
import { type TabsProviderProps, TabsProvider } from "./TabsContext";
//. Compound Component
import { TabsItem } from "./TabsItem";
import { TabsList } from "./TabsList";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsProps extends React.HTMLAttributes<HTMLElement>, TabsProviderProps {
  /** Allow possibility to change alignment of tabs.  */
  alignment?: "left" | "right" | "center";
  /** The direction of the tab container. */
  direction?: "row" | "column";
}

export function Tabs({
  value,
  alignment = "left",
  direction = "row",
  className,
  onValueChange,
  children,
  ...props
}: TabsProps): React.ReactElement {
  const rootName = "tabs";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${alignment}`],
      styles[`${rootName}--${direction}`],
      className,
    ),
  };

  return (
    <div className={cssClasses.root} {...props}>
      <TabsProvider value={value} onValueChange={onValueChange}>
        {children}
      </TabsProvider>
    </div>
  );
}

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
