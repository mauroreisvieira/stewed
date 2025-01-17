import React, { useCallback } from "react";
// Context
import { useTabs } from "./TabsContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the TabsItem component.
 * Extends the standard button element props to allow for additional customization.
 */
export interface TabsItemProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Sets or retrieves the value of a tab list. */
  value: string;
  /** Slot to display before the item children. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the item children. */
  rightSlot?: React.ReactNode;
}

/**
 * TabsItem component that represents an individual tab in a tabbed interface.
 *
 * @param props - The properties for the TabsItem component.
 * @returns {React.ReactElement} The rendered TabsItem component.
 *
 * @see {@link TabsItemProps} for the complete list of props.
 */
export function TabsItem({
  value,
  disabled,
  leftSlot,
  rightSlot,
  className,
  children,
  onClick,
  ...props
}: TabsItemProps): React.ReactElement {
  // Get tab context value and functions.
  const { value: selectedValue, setSelectedValue, onValueChange } = useTabs();

  // Check the tab item selected
  const isSelected = value === selectedValue;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Tabs}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [isSelected && "selected", disabled && "disabled"],
      extraClasses: className
    }),
    left: getElement(["left"]),
    right: getElement(["right"])
  };

  const onHandleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      // If the button is disabled, prevent further actions
      if (disabled) return;

      // If `onValueChange` is provided, use it to update the parent-controlled state
      if (onValueChange) {
        onValueChange(value);
      } else {
        // Otherwise, update the local state if the setter is available
        setSelectedValue?.(value);
      }

      // Trigger the provided `onClick` handler, if defined
      onClick?.(event);
    },
    [disabled, onClick, onValueChange, setSelectedValue, value]
  );

  return (
    <button
      role="tab"
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={cssClasses.root}
      onClick={onHandleClick}
      id={value}
      {...props}
    >
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </button>
  );
}
