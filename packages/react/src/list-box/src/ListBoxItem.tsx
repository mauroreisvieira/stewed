import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ListBoxItemProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * Change the visual style of the menu item.
   * @default primary
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
  ...props
}: ListBoxItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.ListBox}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [skin !== "primary" && skin, selected && "selected", disabled && "disabled"],
      extraClasses: className,
    }),
    left: getElement(["left"]),
    text: getElement(["text"]),
    right: getElement(["right"]),
  };

  return (
    <div
      className={cssClasses.root}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-selected={selected}
      aria-disabled={disabled}
      {...props}
    >
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children && <div className={cssClasses.text}>{children}</div>}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </div>
  );
}
