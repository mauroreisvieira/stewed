import React, { useState } from "react";
// Context
import { TabsContext, type TabsContextProps } from "./TabsContext";
// Compound Component
import { TabsList } from "./TabsList";
import { TabsItem } from "./TabsItem";
import { TabsPanel } from "./TabsPanel";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface TabsBase<T extends string>
  extends Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "defaultChecked">,
    Omit<TabsContextProps<T>, "setSelectedValue"> {
  /**
   * The default value of the selected tab item when the component is uncontrolled.
   * This is used to initialize the state internally.
   */
  defaultValue?: T | undefined;
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
  defaultValue,
  appearance = "underline",
  alignment = "start",
  direction = "row",
  className,
  children,
  onValueChange,
  ...props
}: TabsProps<T>): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(value || defaultValue);
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Tabs, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [appearance, alignment, direction],
      extraClasses: className
    })
  };

  // Ensure consistent usage of controlled or uncontrolled components
  if (value !== undefined && defaultValue !== undefined) {
    throw new Error("Please do not mix controlled and uncontrolled components.");
  }

  // Enforce the requirement for `onValueChange` in controlled mode
  if (value !== undefined && !onValueChange) {
    throw new Error("The `onValueChange` prop must be defined when the component is controlled.");
  }

  return (
    <div className={cssClasses.root} {...props}>
      <TabsContext
        value={{
          value: value || selectedValue,
          setSelectedValue: setSelectedValue as (value: unknown) => void,
          onValueChange: onValueChange as (value: unknown) => void
        }}
      >
        {children}
      </TabsContext>
    </div>
  );
}

// Compound component composition
Tabs.List = TabsList;
Tabs.Item = TabsItem;
Tabs.Panel = TabsPanel;
