import React from "react";
// Context
import { TabsContext, type TabsContextProps } from "./TabsContext";
// Compound Component
import { TabsItem } from "./TabsItem";
import { TabsList } from "./TabsList";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface TabsBase<T extends string>
  extends React.ComponentPropsWithoutRef<"div">,
    TabsContextProps<T> {
  /**
   * The direction of the tab container.
   * @default row
   */
  direction?: "row" | "column";
  /**
   * Change the visual appearance of the tabs.
   * @default simple
   */
  appearance?: "underline";
}

interface TabsDirectionRow<T extends string> extends TabsBase<T> {
  /**
   * The direction of the tab container.
   * @default row
   */
  direction?: "row";
  /**
   * Alignment of the tabs for row direction.
   * @default start
   */
  alignment?: "start" | "center" | "end";
}

interface TabsDirectionColumn<T extends string> extends TabsBase<T> {
  /**
   * The direction of the tab container.
   * @default row
   */
  direction: "column";
  /**
   * Alignment of the tabs for column direction.
   * @default start
   */
  alignment?: "start" | "end";
}

type TabsProps<T extends string> = TabsDirectionRow<T> | TabsDirectionColumn<T>;

export function Tabs<T extends string>({
  value,
  appearance = "underline",
  alignment = "start",
  direction = "row",
  className,
  onValueChange,
  children,
  ...props
}: TabsProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Tabs, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [appearance, alignment, direction],
      extraClasses: className,
    }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      <TabsContext.Provider
        value={{ value, onValueChange: onValueChange as (value: unknown) => void }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
