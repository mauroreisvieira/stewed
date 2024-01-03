import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ListBoxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Change the visual style of the menu item.
   * @default "primary"
   */
  skin?: "primary" | "critical";
  /** Slot to display before the item children. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the item children. */
  rightSlot?: React.ReactNode;
  /** Indicates whether the item is selected. */
  selected?: boolean;
  /** Indicates whether the item is disabled. */
  disabled?: boolean;
}

export function ListBoxItem({
  skin = "primary",
  leftSlot,
  rightSlot,
  selected,
  disabled,
  className,
  children,
}: ListBoxItemProps): React.ReactElement {
  const rootName = "list-box__item";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      skin !== "primary" && styles[`${rootName}--${skin}`],
      selected && styles[`${rootName}--selected`],
      disabled && styles[`${rootName}--disabled`],
      className,
    ),
    left: classNames(styles[`${rootName}__left`]),
    text: classNames(styles[`${rootName}__text`]),
    right: classNames(styles[`${rootName}__right`]),
  };
  return (
    <div className={cssClasses.root} role="menuitem" tabIndex={disabled ? -1 : 0}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children && <div className={cssClasses.text}>{children}</div>}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </div>
  );
}
