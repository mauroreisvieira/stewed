import React from "react";
// UI Components
import { Icon, Spinner } from "../..";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DropdownButtonProps extends React.ComponentPropsWithRef<"button"> {
  /**
   * Change the visual style of the button.
   * @default neutral
   */
  skin?: "neutral" | "critical" | "success";
  /**
   * Changes the size of the button, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg" | "xl";
  /** Slot for icon to display before the button text. */
  leftSlot?: React.ReactNode;
  /**
   * Sets the button to use the full width of its container.
   * If true, the button will stretch to fill the container's width.
   */
  fullWidth?: boolean;
  /** Displays a loading indicator on the button. */
  loading?: boolean;
}

export function DropdownButton({
  skin = "neutral",
  size = "md",
  leftSlot,
  fullWidth,
  loading,
  className,
  children,
  ...props
}: DropdownButtonProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Dropdown}__button`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [skin, size, props.disabled && "disabled", fullWidth && "full-width"],
      extraClasses: className
    }),
    left: getElement(["left"]),
    content: getElement(["content"]),
    spinner: getElement(["spinner"]),
    icon: getElement(["icon"])
  };

  return (
    <button className={cssClasses.root} aria-disabled={props.disabled} {...props}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      <div className={cssClasses.content}>{children}</div>
      {loading ? (
        <Spinner className={cssClasses.spinner} size={size} skin="neutral" />
      ) : (
        <Icon.ChevronDown className={cssClasses.icon} />
      )}
    </button>
  );
}
