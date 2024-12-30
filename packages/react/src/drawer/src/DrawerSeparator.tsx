import React from "react";
// Compound Component
import { Separator, type SeparatorProps } from "../../";

export type DrawerSeparatorProps = Omit<
  SeparatorProps,
  "orientation" | "skin" | "space" | "responsive"
>;

export function DrawerSeparator({ ...props }: DrawerSeparatorProps): React.ReactElement {
  return <Separator {...props} />;
}
