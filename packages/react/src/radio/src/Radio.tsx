import React, { forwardRef, useCallback } from "react";
// Context
import { useRadioGroup } from "./RadioGroupContext";
// Compound Component
import { RadioGroup } from "./RadioGroup";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface RadioProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size">,
    UseResponsiveProps<{
      /**
       * Specifies the size of the radio.
       * @default md
       */
      size?: "sm" | "md" | "lg";
    }> {
  /**
   * Specifies the visual style of the radio.
   * @default primary
   */
  skin?: "primary" | "critical" | "success";
  /**
   * Change the visual appearance of the radio input.
   * @default default
   */
  appearance?: "default" | "bordered";
  /** Content to be rendered within the radio, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * Radio is a form element used for selecting one option from a list.
 *
 * @example
 * ```tsx
 * <Radio skin="neutral">Label</Radio>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {RadioProps} props - The props for the Radio component.
 * @returns {React.ReactElement} - The rendered Radio component.
 */
const Root = forwardRef(
  (
    {
      skin = "primary",
      size = "md",
      appearance = "default",
      className,
      disabled,
      name,
      value,
      checked,
      children,
      onChange,
      ...props
    }: RadioProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Radio, styles });

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        size,
      },
      activeToken.breakpoints,
    );

    // Use the custom hook useCheckboxGroup to access functions and state related to radio management
    const { onCheckedChange, checkedValue, name: groupName } = useRadioGroup();

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          skin,
          appearance !== "default" && appearance,
          computedProps.size,
          disabled && "disabled",
        ],
        extraClasses: className,
      }),
      input: getElement(["input"]),
      control: getElement(["control"]),
      text: getElement(["text"]),
    };

    // Determine the checked state: controlled or uncontrolled
    const isChecked = typeof checkedValue !== "undefined" ? checkedValue === value : checked;

    // Event handler for when the radio state changes
    const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        // Trigger the external onChange handler if provided
        onChange?.(event);

        // Calculate the new checked state by toggling the current checked state
        const newChecked = !isChecked;

        if (value) {
          // Manage checkedValues if value is defined
          const newCheckedValue = newChecked ? value.toString() : "";

          // Update the parent component's checkedValues if onCheckedChange is provided
          onCheckedChange?.(newCheckedValue);
        }
      },
      [isChecked, value, onChange, onCheckedChange],
    );

    return (
      <label className={cssClasses.root}>
        <input
          ref={ref}
          type="radio"
          className={cssClasses.input}
          name={groupName || name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={onHandleChange}
          {...props}
        />
        <span className={cssClasses.control} />
        {children && <div className={cssClasses.text}>{children}</div>}
      </label>
    );
  },
);

// Compound component composition
export const Radio = Object.assign(Root, {
  Group: RadioGroup,
});
