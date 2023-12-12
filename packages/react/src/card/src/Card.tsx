import React from "react";
// Compound Component
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";
import { CardMedia } from "./CardMedia";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The padding size for the card.
   * @default md
   */
  padding?: "none" | "sm" | "md" | "lg";
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
 * @remarks This component props extended from React.HTMLAttributes<HTMLDivElement.
 *
 * @param {CardProps} props - The props for the Card component.
 * @returns {React.ReactElement} - The rendered Card component.
 */
export function Card({
  selected,
  padding = "md",
  className,
  children,
  ...props
}: CardProps): React.ReactElement {
  const rootClassName = "card";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      padding && styles[`${rootClassName}--${padding}`],
      selected && styles[`${rootClassName}--selected`],
      className,
    ),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}

// Compound component composition
Card.Body = CardBody;
Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Footer = CardFooter;
