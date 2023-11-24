import React from "react";
// Compound Component
import { CardBody } from "./CardBody";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

/**
 * This component displays an Card component.
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
 * @param {CardProps} props - The props for the Card component.
 * @returns {React.ReactElement} - The rendered Card component.
 */
export function Card({ selected, className, children, ...props }: CardProps): React.ReactElement {
  const rootClassName = "card";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
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
