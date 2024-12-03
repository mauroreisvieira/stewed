import React from "react";
// Compound Component
import { Separator, type SeparatorProps } from "../../";

export type DialogSeparatorProps = Omit<SeparatorProps, "orientation" | "skin" | "space" | "responsive">;

export function DialogSeparator({ ...props }: DialogSeparatorProps): React.ReactElement {
  return <Separator {...props} />;
}
