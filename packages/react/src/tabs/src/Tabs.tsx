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

/**
 * Interface for the base properties of the `Tabs` component.
 *
 * @remarks
 * Extends the properties of a standard `<div>` element (`React.ComponentPropsWithoutRef<"div">`),
 * allowing the `Tabs` component to accept all native `div` attributes.
 */
interface TabsBase<T extends string>
  extends Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "defaultChecked">,
    Omit<TabsContextProps<T>, "setSelectedValue"> {
  /**
   * The default value of the selected tab item when the component is uncontrolled.
   * This is used to initialize the state internally.
   */
  defaultValue?: T | undefined;
  /**
   * Change the visual appearance of the tabs.
   * @default simple
   */
  appearance?: "underline";
}

/**
 * Extends the base tabs configuration to include direction-specific properties
 * for rendering tabs in a row layout.
 *
 * @template T - A string literal type representing tab values.
 */
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

/**
 * Extends the base tabs configuration to include direction-specific properties
 * for rendering tabs in a column layout.
 *
 * @template T - A string literal type representing tab values.
 */
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

/**
 * Props for the Tabs component.
 * This type is a union of two possible configurations: `TabsDirectionRow` or `TabsDirectionColumn`.
 * Depending on the value, the tabs will be displayed either in a horizontal row or a vertical column.
 *
 * @template T - The type of the tab identifiers, extending a string. This allows flexibility in specifying tab values.
 */
type TabsProps<T extends string> = TabsDirectionRow<T> | TabsDirectionColumn<T>;

/**
 * A functional component that renders a set of tabs for navigation.
 * This component allows users to switch between different views or sections.
 *
 * @template T - The type of the tab values, extending a string. This allows you to specify a list of tab identifiers.
 *
 * @param props - The props for the Tabs component, including the tab values, active tab, and other related settings.
 * @returns A React element representing the tab navigation component.
 *
 * @see {@link TabsProps} for more details on the available props.
 */
export function Tabs<T extends string>({
  value,
  defaultValue,
  appearance = "underline",
  alignment = "start",
  direction = "row",
  keepMounted = false,
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

  // Determine the orientation based on the direction.
  // If the direction is "row", set orientation to "vertical"; otherwise, set it to "horizontal".
  const orientation = direction === "row" ? "vertical" : "horizontal";

  // Ensure consistent usage of controlled or uncontrolled components
  if (value !== undefined && defaultValue !== undefined) {
    throw new Error("Please do not mix controlled and uncontrolled components.");
  }

  // Enforce the requirement for `onValueChange` in controlled mode
  if (value !== undefined && !onValueChange) {
    throw new Error("The `onValueChange` prop must be defined when the component is controlled.");
  }

  return (
    <div className={cssClasses.root} aria-orientation={orientation} {...props}>
      <TabsContext
        value={{
          direction,
          value: value || selectedValue,
          setSelectedValue: setSelectedValue as (value: unknown) => void,
          onValueChange: onValueChange as (value: unknown) => void,
          keepMounted
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
