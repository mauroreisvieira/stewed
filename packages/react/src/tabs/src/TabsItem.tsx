import React from "react";
// Context
import { useTabs } from "./TabsContext";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  onClick,
  children,
  ...props
}: TabsItemProps): React.ReactElement {
  const { onValueChange, value: selectedValue } = useTabs();

  const isSelected = value === selectedValue;
  const rootName = "tabs__item";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      isSelected && styles[`${rootName}--selected`],
      className,
    ),
    left: classNames(styles[`${rootName}__left`]),
    right: classNames(styles[`${rootName}__right`]),
  };

  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) onClick(event);
    if (onValueChange) onValueChange(value);
  };

  return (
    <button
      role="tab"
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={isSelected}
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
