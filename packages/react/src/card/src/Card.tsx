import React from "react";
// Context
import { CardContext, type CardContextProps } from "./CardContext";
// Compound Component
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardFooter } from "./CardFooter";
import { CardMedia } from "./CardMedia";
import { CardSeparator } from "./CardSeparator";
// Tokens
import { components, type Shadow, type Spacings } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the Card component.
 * Extends the standard div element props and includes context properties for managing card state.
 */
export interface CardProps extends CardContextProps, React.ComponentPropsWithRef<"div"> {
  /**
   * The direction of the card.
   * @default column
   */
  direction?: "row" | "column";
  /** Padding options for horizontal and vertical orientation. */
  padding?: {
    /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
    block?: Spacings;
    /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
    inline?: Spacings;
  };
  /**
   * The shadow of the card.
   * @default sm
   */
  shadow?: Shadow;
}

/**
 * This component displays an card component.
 * Cards component are used to communicate a state that affects a system, feature or page.
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param props - The props for the Card component.
 * @returns The rendered Card component.
 *
 * @see {@link CardProps} for the complete list of props.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Body>
 *     <p>This action cannot be undone...</p>
 *    </Card.Body>
 * </Card>
 * ```
 */
export function Card({
  ref,
  direction = "column",
  shadow = "sm",
  padding = {
    block: "xl",
    inline: "xl"
  },
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
        direction,
        padding?.block && `padding-block-${padding.block}`,
        padding?.inline && `padding-inline-${padding.inline}`,
        shadow && `shadow-${shadow}`
      ],
      extraClasses: className
    })
  };

  return (
    <CardContext value={{ direction }}>
      <div ref={ref} className={cssClasses.root} {...props}>
        {children}
      </div>
    </CardContext>
  );
}

// Compound component composition
Card.Body = CardBody;
Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Separator = CardSeparator;
