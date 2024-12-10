import React, { useCallback, useEffect, useRef } from "react";
// Compound Component
import { CheckboxGroup } from "./CheckboxGroup";
// Context
import { useCheckboxGroup } from "./CheckboxGroupContext";
// UI Components
import { Spinner, Icon } from "../../index";
// Hooks
import { useBem, useMergeRefs, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size">,
    UseResponsiveProps<{
      /**
       * Specifies the size of the checkbox.
       * @default md
       */
      size?: "sm" | "md" | "lg";
    }> {
  /**
   * Specifies the visual style of the checkbox.
   * @default primary
   */
  skin?: "primary" | "critical" | "success";
  /**
   * Change the visual appearance of the checkbox input.
   * @default default
   */
  appearance?: "default" | "border";
  /**
   * Sets the checkbox to an indeterminate state.
   * @default false
   * @see [MDN Documentation]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate}
   */
  indeterminate?: boolean;
  /** Displays a loading indicator on the checkbox. */
  loading?: boolean;
  /** Content to be rendered within the checkbox, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * Checkbox component allow the user to select multiple options from a set.
 *
 * @example
 * ```tsx
 * <Checkbox skin="neutral">Label</Checkbox>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @returns {React.ReactElement} - The rendered Checkbox component.
 */
export function Checkbox({
  ref,
  skin = "primary",
  size = "md",
  appearance = "default",
  className,
  disabled,
  indeterminate = false,
  loading,
  value,
  checked,
  children,
  onChange,
  ...props
}: CheckboxProps): React.ReactElement {
  // Create a ref for the input element, initialized to null
  const inputRef = useRef<HTMLInputElement>(null);

  // This allows both refs to point to the same DOM element, enabling multiple components or hooks to interact with the same element.
  const mergeRefs = useMergeRefs();
  // eslint-disable-next-line react-compiler/react-compiler
  const mergedRefs = mergeRefs([ref, inputRef]);

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Checkbox, styles });

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      size,
    },
    activeToken.breakpoints,
  );

  // Use the custom hook useCheckboxGroup to access functions and state related to checkbox management
  const { onCheckedChange, checkedValues } = useCheckboxGroup();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        disabled && "disabled",
        loading && "loading",
        computedProps.size,
        skin,
        appearance !== "default" && appearance,
      ],
      extraClasses: className,
    }),
    svg: getElement(["svg"]),
    input: getElement(["input"]),
    control: getElement(["control"]),
    text: getElement(["text"]),
    spinner: getElement(["spinner"]),
  };

  // Effect to handle the indeterminate state of the checkbox
  useEffect(() => {
    const node = inputRef.current;

    if (node) {
      node.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Determine the checked state: controlled or uncontrolled
  const isChecked =
    typeof checkedValues !== "undefined"
      ? !!(value && checkedValues.includes(value.toString()))
      : checked;

  // Event handler for when the checkbox state changes
  const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      // Trigger the external onChange handler if provided
      onChange?.(event);

      // Calculate the new checked state by toggling the current checked state
      const newChecked = !isChecked;

      if (value) {
        // Manage checkedValues if value is defined
        const newCheckedValues = newChecked
          ? [...(checkedValues || []), value.toString()]
          : checkedValues?.filter((checkedValue) => checkedValue !== value);

        // Update the parent component's checkedValues if onCheckedChange is provided
        onCheckedChange?.(newCheckedValues || []);
      }
    },
    [isChecked, checkedValues, value, onChange, onCheckedChange],
  );

  return (
    <label className={cssClasses.root}>
      <input
        ref={mergedRefs}
        type="checkbox"
        disabled={disabled}
        checked={isChecked}
        value={value}
        className={cssClasses.input}
        onChange={onHandleChange}
        {...props}
      />
      <span className={cssClasses.control}>
        {loading ? (
          <Spinner
            className={cssClasses.spinner}
            skin="white"
            size={computedProps.size === "sm" ? "xxs" : computedProps.size === "md" ? "xs" : "sm"}
          />
        ) : (
          <>
            {indeterminate ? (
              <Icon.Minus className={cssClasses.svg} />
            ) : (
              <Icon.Check className={cssClasses.svg} />
            )}
          </>
        )}
      </span>
      {children && <div className={cssClasses.text}>{children}</div>}
    </label>
  );
}

// Compound component composition
Checkbox.Group = CheckboxGroup;
