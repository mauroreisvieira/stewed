import React from "react";
// Context
import { TabsContext, TabsContextProps } from "./TabsContext";
//. Compound Component
import { TabsItem } from "./TabsItem";
import { TabsList } from "./TabsList";
import { TabsPanel } from "./TabsPanel";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsProps {
  /** Sets value of tab item selected. */
  value: TabsContextProps["value"];
  /** Callback fired when the value changes. */
  onValueChange?: TabsContextProps["onValueChange"];
  className?: string;
  children: React.ReactNode;
}

export const Tabs = ({
  value,
  className,
  onValueChange,
  children,
}: TabsProps): React.ReactElement => {
  const rootClassName = "tabs";
  const cssClasses = {
    root: classNames(styles[rootClassName], className),
  };

  return (
    <div className={cssClasses.root}>
      <TabsContext.Provider
        value={{
          value,
          onValueChange,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
};

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
Tabs.Panel = TabsPanel;
