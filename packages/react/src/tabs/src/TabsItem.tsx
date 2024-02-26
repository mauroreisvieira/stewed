import React, { useCallback } from "react";
// Context
import { useTabs } from "./TabsContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsItemProps extends React.ComponentPropsWithRef<"button"> {
  /** Sets or retrieves the value of a tab list. */
  value: string;
  /** Slot to display before the item children. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the item children. */
  rightSlot?: React.ReactNode;
}

export function TabsItem({
  value,
  disabled,
  leftSlot,
  rightSlot,
  className,
  tabIndex,
  children,
  onClick,
  ...props
}: TabsItemProps): React.ReactElement {
  const { onValueChange, value: selectedValue } = useTabs();

  const isSelected = value === selectedValue;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Tabs}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [isSelected && "selected", disabled && "disabled"],
      extraClasses: className,
    }),
    left: getElement(["left"]),
    right: getElement(["right"]),
  };

  const onHandleClick:React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (disabled) return;
    onValueChange?.(value);
    onClick?.(event);
  }, [disabled, onClick, onValueChange, value]);

  return (
    <button
      role="tab"
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={isSelected}
      tabIndex={!isSelected || disabled ? -1 : tabIndex}
      className={cssClasses.root}
      onClick={onHandleClick}
      {...props}
    >
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </button>
  );
}
