import React, { useRef } from "react";
// Provider
import { TabsProvider, type TabsProviderProps } from "./TabsProvider";
// Compound Component
import { TabsItem } from "./TabsItem";
import { TabsList } from "./TabsList";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsProps<T extends string> extends React.ComponentPropsWithRef<"div">, TabsProviderProps<T> {
  /**
   * Allow possibility to change alignment of tabs.
   * @default start
   */
  alignment?: "start" | "center" | "end";
  /**
   * The direction of the tab container.
   * @default row
   */
  direction?: "row" | "column";
  /**
   * Changes the size of the tabs, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg";
}

export function Tabs<T extends string>({
  value,
  alignment = "start",
  direction = "row",
  size = "md",
  className,
  onValueChange,
  children,
  ...props
}: TabsProps<T>): React.ReactElement {
  const ref = useRef<React.ElementRef<"div">>(null);

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Tabs, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [alignment, size, direction !== "row" && direction],
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
