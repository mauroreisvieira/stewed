import React, { forwardRef } from "react";
// Components
import { Spinner } from "../../spinner";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SwitchProps extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  /**
   * Specifies the visual style of the switch.
   * @default primary
   */
  skin?: "primary" | "critical";
  /**
   * Specifies the size of the switch.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /** Sets element's content before switch. */
  reversed?: boolean;
  /** Displays a loading indicator on the switch. */
  loading?: boolean;
  /** Content to be rendered within the switch, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * Switch component communicate an action a user can take.
 *
 * @example
 * ```tsx
 * <Switch skin="neutral">Label</Switch>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {SwitchProps} props - The props for the Switch component.
 * @returns {React.ReactElement} - The rendered Switch component.
 */
export const Switch = forwardRef(
  (
    {
      skin = "primary",
      size = "md",
      reversed,
      loading,
      disabled,
      children,
      className,
      ...props
    }: SwitchProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Switch, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          skin,
          size,
          disabled && "disabled",
          loading && "loading",
          reversed && "reversed",
        ],
        extraClasses: className,
      }),
      input: getElement(["input"]),
      control: getElement(["control"]),
      text: getElement(["text"]),
      spinner: getElement(["spinner"]),
    };

    return (
      <label className={cssClasses.root}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={cssClasses.input}
          {...props}
        />
        <span className={cssClasses.control}>
          {loading && (
            <Spinner
              className={cssClasses.spinner}
              skin="default"
              size={size === "sm" ? "xxs" : size === "md" ? "xs" : "sm"}
            />
          )}
        </span>
        {children && <span className={cssClasses.text}>{children}</span>}
      </label>
    );
  },
);
