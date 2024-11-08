import React from "react";
// Utilities
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default HTML element type for the this component
const defaultElement = "span";

export interface TagProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the tag.
   * @default span
   */
  as?: T;
  /**
   * Change the visual style of the tag.
   * @default primary
   */
  skin?: "primary" | "secondary" | "neutral" | "critical" | "success" | "info" | "warning";
  /**
   * Change the visual appearance of the tag.
   * @default filled
   */
  appearance?: "filled" | "soft" | "outline" | "ghost";
  /**
   * Changes the size of the tag, giving it more or less padding.
   * @default md
   */
  size?: "xs" | "sm" | "md" | "lg";
  /** Slot for icon to display before the tag text. */
  leftSlot?: React.ReactNode;
  /** Slot for icon to display after the tag text. */
  rightSlot?: React.ReactNode;
  /** Disables the tag, disallowing merchant interaction. */
  disabled?: boolean;
}

/**
 * Tag component are used to visually label UI objects for quick recognition and navigation.
 *
 * @example
 * ```tsx
 * <Tag skin="neutral" size="sm">Example</Tag>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {TagProps} props - The props for the Tag component.
 * @returns {React.ReactElement} - The rendered Tag component.
 */
export const Tag = fixedForwardRef(function Tag<T extends React.ElementType>(
  {
    as,
    skin = "primary",
    appearance = "filled",
    size = "md",
    className,
    leftSlot,
    rightSlot,
    children,
    ...props
  }: TagProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>,
): React.ReactElement {
  // Determine the component type based on 'as' prop or use the default element
  const Comp = as || defaultElement;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Tag, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [`${skin}-${appearance}`, size], extraClasses: className }),
    left: getElement(["left"]),
    right: getElement(["right"]),
  };

  return (
    <Comp ref={ref} className={cssClasses.root} {...props}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      {children}
      {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
    </Comp>
  );
});
