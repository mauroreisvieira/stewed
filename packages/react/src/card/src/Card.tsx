import React from "react";
// Compound Component
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";
import { CardMedia } from "./CardMedia";
// Tokens
import { Spacings, components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
import { type Shadow } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface CardProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * Change the visual style of the card.
   * @default default
   */
  skin?: "default" | "neutral" | "neutral-faded" | "primary" | "primary-faded";
  /** Padding options for horizontal and vertical orientation. */
  padding?: {
    /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
    block?: Spacings;
    /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
    inline?: Spacings;
  };
  /** Enable a hover state on table rows within. */
  hoverable?: boolean;
  /**
   * The shadow of the card.
   * @default sm
   */
  shadow?: Shadow;
  /** A boolean indicating whether the card is selected. */
  selected?: boolean;
}

/**
 * This component displays an card component.
 * Cards component are used to communicate a state that affects a system, feature or page.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Body>
 *     <p>This action cannot be undone...</p>
 *    </Card.Body>
 * </Card>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {CardProps} props - The props for the Card component.
 * @returns {React.ReactElement} - The rendered Card component.
 */
export function Card({
  skin = "default",
  shadow = "sm",
  padding = {
    block: "xl",
    inline: "xl",
  },
  selected,
  hoverable,
  className,
  children,
  ...props
}: CardProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Card, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        skin,
        padding?.block && `padding-block-${padding.block}`,
        padding?.inline && `padding-inline-${padding.inline}`,
        shadow && `shadow-${shadow}`,
        hoverable && "hoverable",
        selected && "selected",
      ],
      extraClasses: className,
    }),
  };

  return (
    <div className={cssClasses.root} aria-selected={selected} {...props}>
      {children}
    </div>
  );
}

// Compound component composition
Card.Body = CardBody;
Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Footer = CardFooter;
