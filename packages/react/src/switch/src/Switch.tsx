import React from "react";
// Components
import { Spinner, type SpinnerProps } from "../../spinner";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SwitchProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size">,
    UseResponsiveProps<{
      /**
       * Specifies the size of the switch.
       * @default md
       */
      size?: "sm" | "md" | "lg";
    }> {
  /**
   * Specifies the visual style of the switch.
   * @default primary
   */
  skin?: "primary" | "critical" | "success";
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
export function Switch({
  skin = "primary",
  size = "md",
  reversed,
  loading,
  disabled,
  children,
  className,
  ...props
}: SwitchProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Switch, styles });

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      size
    },
    activeToken.breakpoints
  );

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        skin,
        computedProps.size,
        disabled && "disabled",
        loading && "loading",
        reversed && "reversed"
      ],
      extraClasses: className
    }),
    input: getElement(["input"]),
    control: getElement(["control"]),
    thumb: getElement(["thumb"]),
    text: getElement(["text"]),
    spinner: getElement(["spinner"])
  };

  const sizeSpinnerMap: Record<string, SpinnerProps["size"]> = {
    sm: "xxs",
    md: "xs"
  };

  return (
    <label className={cssClasses.root}>
      <input type="checkbox" disabled={disabled} className={cssClasses.input} {...props} />
      <span className={cssClasses.control}>
        <span className={cssClasses.thumb}>
          {loading && (
            <Spinner
              className={cssClasses.spinner}
              skin="default"
              size={sizeSpinnerMap[computedProps.size] || "sm"}
            />
          )}
        </span>
      </span>
      {children && <span className={cssClasses.text}>{children}</span>}
    </label>
  );
}
