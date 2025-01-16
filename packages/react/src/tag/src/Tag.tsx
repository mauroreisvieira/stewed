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
const defaultElement = "span";

/**
 * Props for the Tag component.
 * Extends the default properties of a specified HTML element (default is "span").
 *
 * @template E - The type of the HTML element that the Tag component will render.
 * This allows flexibility to render the tag as a different element (e.g., "div", "a", etc.).
 */
export type TagProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the tag.
     * @default span
     */
    as?: E;
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
  },
  E
>;

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
 * @see {@link TagProps} for more details on the available props.
 *
 * @param props - The props for the Tag component.
 * @returns The rendered Tag component.
 */
export const Tag = forwardRef(
  (
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
    }: TagProps,
    ref: React.Ref<Element>
  ): React.ReactElement => {
    // Determine the component type based on 'as' prop or use the default element
    const Comp = as || defaultElement;

    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Tag, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [`${skin}-${appearance}`, size, props.disabled && "disabled"],
        extraClasses: className
      }),
      left: getElement(["left"]),
      right: getElement(["right"])
    };

    return (
      <Comp ref={ref} className={cssClasses.root} aria-disabled={props.disabled} {...props}>
        {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
        {children}
        {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
      </Comp>
    );
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: TagProps<E>
) => React.ReactElement;
