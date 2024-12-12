import React from "react";
// UI Components
import { Spinner } from "../../spinner";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default HTML element type for the this component
const defaultElement = "button";

export interface ButtonProps<T = typeof defaultElement>
  extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the button.
   * @default button
   */
  as?: T;
  /**
   * Change the visual style of the button.
   * @default primary
   */
  skin?: "primary" | "secondary" | "neutral" | "critical" | "success";
  /**
   * Change the visual appearance of the button.
   * @default filled
   */
  appearance?: "filled" | "soft" | "outline" | "ghost";
  /**
   * Changes the size of the button, giving it more or less padding.
   * @default md
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Slot for icon to display before the button text. */
  leftSlot?: React.ReactNode;
  /** Slot for icon to display after the button text. */
  rightSlot?: React.ReactNode;
  /** Indicates whether the button is in a pressed state. */
  pressed?: boolean;
  /**
   * Sets the button to use the full width of its container.
   * If true, the button will stretch to fill the container's width.
   */
  fullWidth?: boolean;
  /** Hide content and show only the icon. */
  iconOnly?: boolean;
  /** Disables the button, disallowing merchant interaction. */
  disabled?: boolean;
  /** Displays a loading indicator on the button. */
  loading?: boolean;
}

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action,
 * or performing a delete operation.
 *
 * @example
 * ```tsx
 * <Button skin="neutral">Button</Button>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {React.ReactElement} - The rendered Button component.
 */
export const Button = fixedForwardRef(function Button<T extends React.ElementType>(
  {
    as,
    skin = "primary",
    appearance = "filled",
    size = "md",
    leftSlot,
    rightSlot,
    pressed,
    fullWidth,
    iconOnly,
    loading,
    className,
    children,
    ...props
  }: ButtonProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>
): React.ReactElement {
  // Determine the component type based on 'as' prop or use the default element
  const Comp = as || defaultElement;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Button, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        `${skin}-${appearance}`,
        size,
        pressed && "pressed",
        iconOnly && "icon-only",
        fullWidth && "full-width",
        loading && "loading",
        props.disabled && "disabled"
      ],
      extraClasses: className
    }),
    spinner: getElement(["spinner"]),
    left: getElement(["left"]),
    text: getElement(["text"]),
    right: getElement(["right"])
  };

  return (
    <Comp
      ref={ref}
      className={cssClasses.root}
      aria-pressed={pressed}
      aria-disabled={props.disabled}
      {...props}
    >
      {loading && <Spinner className={cssClasses.spinner} skin="default" size={size} />}
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      {children && <span className={cssClasses.text}>{children}</span>}
      {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
    </Comp>
  );
});
