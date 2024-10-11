import React, { forwardRef } from "react";
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

export const ListBoxItem = forwardRef(function Root(
  {
    skin = "primary",
    leftSlot,
    rightSlot,
    selected,
    disabled,
    className,
    children,
    ...props
  }: ListBoxItemProps,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement {
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
      ref={ref}
      className={cssClasses.root}
      role="option"
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      aria-disabled={disabled}
      {...props}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children && <div className={cssClasses.text}>{children}</div>}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </div>
  );
});
