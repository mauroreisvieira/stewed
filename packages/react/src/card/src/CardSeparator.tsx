import React from "react";
// Compound Component
import { Separator, type SeparatorProps } from "../../";
import { useCard } from "./CardContext";

export type CardSeparatorProps = Omit<
  SeparatorProps,
  "orientation" | "skin" | "space" | "responsive"
>;

export function CardSeparator({ ...props }: CardSeparatorProps): React.ReactElement {
  const { direction } = useCard();
  return <Separator orientation={direction === "row" ? "vertical" : "horizontal"} {...props} />;
}
