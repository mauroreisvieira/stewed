import React from "react";
// Compound Component
import { SelectGroup } from "./SelectGroup";
import { SelectOption } from "./SelectOption";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// UI Components
import { Icon } from "../../index";
// Styles
import styles from "./styles/index.module.scss";

export interface SelectProps extends Omit<React.ComponentPropsWithRef<"select">, "size"> {
  /**
   * Change the visual appearance of the select.
   * @default outline
   */
  appearance?: "ghost" | "outline" | "soft";
  /**
   * Change the visual style of the select.
   * @default "neutral"
   */
  skin?: "neutral" | "critical" | "success";
  /**
   * Changes the size of the select, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg" | "xl";
  /** Slot for icon to display before the select. */
  leftSlot?: React.ReactNode;
  /**
   * Sets the select to use the full width of its container.
   * If true, the select will stretch to fill the container's width.
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Select component lets you choose a single value from a list of options.
 *
 * @example
 * ```tsx
 * <Select skin="default">
 *    <Select.Option value={1}>Option 1</Select.Option>
 *    <Select.Option value={2}>Option 2</Select.Option>
 *    <Select.Option value={3}>Option 3</Select.Option>
 * </Select>
 * ```
 *
 * @param {SelectProps} props - The props for the Select component.
 * @returns {React.ReactElement} - The rendered Select component.
 */
export function Select({
  skin = "neutral",
  appearance = "outline",
  size = "md",
  leftSlot,
  disabled,
  fullWidth = true,
  className,
  children,
  ...props
}: SelectProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Select, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [disabled && "disabled", fullWidth && "full-width", skin, appearance, size],
      extraClasses: className
    }),
    left: getElement(["left"]),
    input: getElement(["input"]),
    icon: getElement(["icon"])
  };

  return (
    <div className={cssClasses.root}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      <select className={cssClasses.input} disabled={disabled} {...props}>
        {children}
      </select>
      <Icon.ChevronUpDown className={cssClasses.icon} />
    </div>
  );
}

// Compound component composition
Select.Group = SelectGroup;
Select.Option = SelectOption;
