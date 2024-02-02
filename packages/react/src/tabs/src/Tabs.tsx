import React, { useRef } from "react";
// Provider
import { TabsProvider, type TabsProviderProps } from "./TabsProvider";
//. Compound Component
import { TabsItem } from "./TabsItem";
import { TabsList } from "./TabsList";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
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
  const ref = useRef<React.ElementRef<"div">>(null);

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Tabs, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [alignment, direction !== "row" && direction],
      extraClasses: className,
    }),
  };

  return (
    <div ref={ref} className={cssClasses.root} {...props}>
      <TabsProvider value={value} onValueChange={onValueChange}>
        {children}
      </TabsProvider>
    </div>
  );
}

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
