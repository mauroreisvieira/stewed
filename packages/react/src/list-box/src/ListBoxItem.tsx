import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

const defaultElement = "div";

export interface ListBoxItemProps<T = typeof defaultElement>
  extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the box.
   * @default div
   */
  as?: T;
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

export const ListBoxItem = fixedForwardRef(function ListBoxItem<T extends React.ElementType>(
  {
    as,
    skin = "primary",
    leftSlot,
    rightSlot,
    selected,
    disabled,
    className,
    children,
    ...props
  }: ListBoxItemProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>
): React.ReactElement {
  // Component to render based on the 'as' prop
  const Comp = as || defaultElement;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.ListBox}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [skin !== "primary" && skin, selected && "selected", disabled && "disabled"],
      extraClasses: className
    }),
    left: getElement(["left"]),
    text: getElement(["text"]),
    right: getElement(["right"])
  };

  return (
    <Comp
      ref={ref}
      className={cssClasses.root}
      role="option"
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      aria-disabled={disabled}
      {...props}
    >
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children && <div className={cssClasses.text}>{children}</div>}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </Comp>
  );
});
