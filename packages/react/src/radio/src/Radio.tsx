import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Specifies the visual style of the radio.
   * @default primary
   */
  skin?: "primary" | "critical";
  /**
   * Specifies the size of the radio.
   * @default md
   */
  size?: "sm" | "md" | "lg";
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
export const Radio = forwardRef(
  (
    { skin = "critical", size = "md", className, disabled, children, ...props }: RadioProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Radio, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [skin, size, disabled && "disabled"],
        extraClasses: className,
      }),
      input: getElement(["input"]),
      control: getElement(["control"]),
      text: getElement(["text"]),
    };

    return (
      <label className={cssClasses.root}>
        <input ref={ref} type="radio" disabled={disabled} className={cssClasses.input} {...props} />
        <span className={cssClasses.control} />
        {children && <span className={cssClasses.text}>{children}</span>}
      </label>
    );
  },
);
