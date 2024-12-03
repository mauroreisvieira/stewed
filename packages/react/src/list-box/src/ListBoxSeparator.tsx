import React from "react";
// Compound Component
import { Separator, type SeparatorProps } from "../../";

export type ListBoxSeparatorProps = Omit<
  SeparatorProps,
  "orientation" | "skin" | "space" | "responsive"
>;

export function ListBoxSeparator({ ...props }: ListBoxSeparatorProps): React.ReactElement {
  return <Separator space={{ block: "sm" }} {...props} />;
}
