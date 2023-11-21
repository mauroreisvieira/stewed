import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default HTML element type for the this component
const defaultElement = "button";

export interface ButtonProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the button.
   * @default "button"
   */
  as?: T;
  /**
   * Change the visual style of the button.
   * @default "primary"
   */
  skin?: "primary" | "secondary" | "danger";
  /**
   * Change the visual appearance of the button.
   * @default "filled"
   */
  appearance?: "filled" | "ghost" | "outline";
  /**
   * Changes the size of the button, giving it more or less padding.
   * @default "md`
   */
  size?: "sm" | "md" | "lg";
  /** Slot for icon to display before the button text. */
  leftIcon?: React.ReactNode;
  /** Slot for icon to display after the button text. */
  rightIcon?: React.ReactNode;
  /** Allows the button to grow to the width of its container. */
  fullWidth?: boolean;
  /** Hide content and show only the icon. */
  iconOnly?: boolean;
  /** Disables the button, disallowing merchant interaction. */
  disabled?: boolean;
  /** The content to display inside the button. */
  children?: React.ReactNode;
}

/**
 * This component displays an button component.
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action,
 * or performing a delete operation.
 *
 * @example
 * ```tsx
 * <Button skin="secondary">Button</Button>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {React.ReactElement} - The rendered Button component.
 */
export const Button = fixedForwardRef(function UnwrappedButton<T extends React.ElementType>(
  {
    as,
    skin = "primary",
    appearance = "filled",
    size = "md",
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    iconOnly,
    children,
    disabled,
    ...props
  }: ButtonProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>,
): React.ReactElement {
  // Determine the component type based on 'as' prop or use the default element
  const Comp = as || defaultElement;

  // Root class name for styling
  const rootName = "button";

  // CSS classes based on component props and styles
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      styles[`${rootName}--${appearance}`],
      styles[`${rootName}--${size}`],
      iconOnly && styles[`${rootName}--icon-only`],
      fullWidth && styles[`${rootName}--fullWidth`],
      disabled && styles[`${rootName}--${disabled}`],
      className,
    ),
    left: classNames(styles[`${rootName}__left`]),
    text: classNames(styles[`${rootName}__text`]),
    right: classNames(styles[`${rootName}__right`]),
  };

  return (
    <Comp ref={ref} className={cssClasses.root} {...props} >
      {leftIcon && <span className={cssClasses.left}>{leftIcon}</span>}
      {children && <span className={cssClasses.text}>{children}</span>}
      {rightIcon && <span className={cssClasses.right}>{rightIcon}</span>}
    </Comp>
  );
});
