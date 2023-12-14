import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Specifies the visual style of the checkbox.
   * @default primary
   */
  skin?: "primary" | "error";
  /**
   * Specifies the size of the checkbox.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * Sets the checkbox to an indeterminate state.
   * @default false
   * @see [MDN Documentation]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate}
   */
  indeterminate?: boolean;
  /** Content to be rendered within the checkbox, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * Checkbox component allow the user to select multiple options from a set.
 *
 * @example
 * ```tsx
 * <Checkbox skin="secondary">Label</Checkbox>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @returns {React.ReactElement} - The rendered Checkbox component.
 */
export const Checkbox = forwardRef(
  (
    {
      skin = "primary",
      size = "md",
      className,
      disabled,
      indeterminate = false,
      children,
      ...props
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const rootName = "checkbox";
    const cssClasses = {
      root: classNames(
        styles[rootName],
        disabled && styles[`${rootName}--disabled`],
        styles[`${rootName}--${size}`],
        styles[`${rootName}--${skin}`],
        className,
      ),
      svg: styles[`${rootName}__svg`],
      input: styles[`${rootName}__input`],
      control: styles[`${rootName}__control`],
      text: styles[`${rootName}__text`],
    };

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current,
    );

    useEffect(() => {
      const node = inputRef.current;

      if (node) {
        node.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label className={cssClasses.root}>
        <input
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          className={cssClasses.input}
          {...props}
        />
        <span className={cssClasses.control}>
          {indeterminate ? (
            <svg
              className={cssClasses.svg}
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
            </svg>
          ) : (
            <svg
              className={cssClasses.svg}
              viewBox="0 0 20 20"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z" />
            </svg>
          )}
        </span>
        {children && <span className={cssClasses.text}>{children}</span>}
      </label>
    );
  },
);
