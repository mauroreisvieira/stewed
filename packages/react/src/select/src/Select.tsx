import React from "react";
// Compound Component
import { SelectOption } from "./SelectOption";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SelectProps extends React.ComponentPropsWithRef<"select"> {
  /**
   * Change the visual style of the select.
   * @default default
   */
  skin?: "default" | "critical";
}

export function Select({
  skin = "default",
  disabled,
  className,
  children,
  ...props
}: SelectProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Select, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [disabled && "disabled", skin !== "default" && skin],
      extraClasses: className,
    }),
    input: getElement(["input"]),
    icon: getElement(["icon"]),
  };

  return (
    <div className={cssClasses.root}>
      <select className={cssClasses.input} disabled={disabled} {...props}>
        {children}
      </select>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cssClasses.icon}
      >
        <path
          d="M7 16L12 21L17 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 8L12 3L7 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Compound component composition
Select.Option = SelectOption;
