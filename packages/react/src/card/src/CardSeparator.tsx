import React from "react";
// Context
import { useCard } from "./CardContext";
// Compound Component
import { Separator, type SeparatorProps } from "../../";

/**
 * Props for the CardSeparator component.
 * Extends the `SeparatorProps` type, omitting the `orientation`, `skin`, `space`, and `responsive` properties.
 */
export type CardSeparatorProps = Omit<
  SeparatorProps,
  "orientation" | "skin" | "space" | "responsive"
>;

/**
 * A functional component that renders a separator inside a card.
 * Used to visually divide content within a card component.
 *
 * @param props - Additional properties to apply to the separator element.
 * @returns A React element representing the separator inside the card.
 */
export function CardSeparator({ ...props }: CardSeparatorProps): React.ReactElement {
  // Get the current layout direction, typically "row" or "column".
  const { direction } = useCard();

  // Determine the orientation based on the direction.
  // If the direction is "row", set orientation to "vertical"; otherwise, set it to "horizontal".
  const orientation = direction === "row" ? "vertical" : "horizontal";

  return <Separator orientation={orientation} aria-orientation={orientation} {...props} />;
}
