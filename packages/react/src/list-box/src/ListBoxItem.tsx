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
  skin?: "primary" | "danger";
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
  const rootClassName = "list-box__item";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      skin !== "primary" && styles[`${rootClassName}--${skin}`],
      selected && styles[`${rootClassName}--selected`],
      disabled && styles[`${rootClassName}--disabled`],
      className,
    ),
    left: classNames(styles[`${rootClassName}__left`]),
    text: classNames(styles[`${rootClassName}__text`]),
    right: classNames(styles[`${rootClassName}__right`]),
  };
  return (
    <div className={cssClasses.root} role="menuitem" tabIndex={disabled ? -1 : 0}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      {children && <span className={cssClasses.text}>{children}</span>}
      {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
    </div>
  );
}
