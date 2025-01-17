import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import type { CombinedProps } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default element type to be used when 'as' prop is not provided.
const defaultElement = "div";

/**
 * Props for the List Box Item component.
 * Extends the default properties of a specified HTML element (default is "div").
 *
 * @template E - The type of the HTML element that the List Box Item component will render.
 * This allows flexibility to render the tag as a different element (e.g., "div", "span").
 */
export type ListBoxItemProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the box.
     * @default div
     */
    as?: E;
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
  },
  E
>;

export const ListBoxItem = forwardRef(
  (
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
    }: ListBoxItemProps,
    ref: React.Ref<Element>
  ) => {
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
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ListBoxItemProps<E>
) => React.ReactElement;
