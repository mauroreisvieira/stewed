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
  const { direction } = useCard();

  return <Separator orientation={direction === "row" ? "vertical" : "horizontal"} {...props} />;
}
