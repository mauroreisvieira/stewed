import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * Skin color of the badge.
   * @default primary
   */
  skin?: "primary" | "secondary" | "neutral" | "critical" | "success" | "info" | "warning";
  /**
   * Changes the size of the badge, giving it more or less padding.
   * @default sm
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Change the visual appearance of the badge.
   * @default filled
   */
  appearance?: "filled" | "outline";
  /**
   * Change the wrapped shape the badge should overlap.
   * @default rectangular
   */
  overlap?: "rectangular" | "circular";
  /**
   * Position of the badge.
   * @default top-right
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Value displayed on the badge. */
  value?: string;
  /** Content inside the badge. */
  children?: React.ReactNode;
}

/**
 * This component displays an badge component.
 * Badge consists of a small circle notification element.
 *
 * @example
 * ```tsx
 * <Badge value="10" skin="neutral" />
 * ```
 *
 * @param {BadgeProps} props - The props for the Badge component.
 * @returns {React.ReactElement} - The rendered Badge component.
 */
export function Badge({
  skin = "primary",
  size = "sm",
  overlap = "rectangular",
  appearance = "filled",
  position = "top-right",
  value,
  className,
  children,
}: BadgeProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Badge, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        `${skin}-${appearance}`,
        size,
        overlap,
        !!children && position,
        value && value.length > 2 && "padded",
      ],
      extraClasses: className,
    }),
    value: getElement(["value"]),
  };

  return (
    <span className={cssClasses.root}>
      {children}
      <span className={cssClasses.value}>{value}</span>
    </span>
  );
}
