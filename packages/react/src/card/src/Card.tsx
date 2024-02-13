import React from "react";
// Compound Component
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";
import { CardMedia } from "./CardMedia";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
import {
  type Elevation
} from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The padding size for the card.
   * @default md
   */
  padding?: "none" | "sm" | "md" | "lg";
  /** Enable a hover state on table rows within */
  hoverable?: boolean;
  /**
   * The elevation shadow of the card.
   * @default sm
   */
  elevation?: Elevation;
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
 * @remarks This component props extended from React.HTMLAttributes<HTMLDivElement>.
 *
 * @param {CardProps} props - The props for the Card component.
 * @returns {React.ReactElement} - The rendered Card component.
 */
export function Card({
  hoverable,
  elevation = "sm",
  selected,
  padding = "md",
  className,
  children,
  ...props
}: CardProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Card, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [padding, elevation && `elevation-${elevation}`, hoverable && "hoverable", selected && "selected"],
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
