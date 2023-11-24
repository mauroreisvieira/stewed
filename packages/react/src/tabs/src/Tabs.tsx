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

export interface TabsProps extends TabsProviderProps {
  className?: string;
}

export function Tabs({ value, className, onValueChange, children }: TabsProps): React.ReactElement {
  const rootClassName = "tabs";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
  };

  return (
    <div className={cssClasses.root}>
      <TabsProvider value={value} onValueChange={onValueChange}>
        {children}
      </TabsProvider>
    </div>
  );
}

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
