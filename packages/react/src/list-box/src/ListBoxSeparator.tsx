import React from "react";
// Compound Component
import { Separator, type SeparatorProps } from "../../";

/**
 * Props for the ListBoxSeparator component.
 * This type omits the 'orientation', 'skin', 'space', and 'responsive' properties from the SeparatorProps type.
 */
export type ListBoxSeparatorProps = Omit<
  SeparatorProps,
  "orientation" | "skin" | "space" | "responsive"
>;

/**
 * A separator component for use in a list box.
 *
 * @param props - The properties for the ListBoxSeparator component.
 * @returns A React element representing the ListBoxSeparator.
 *
 * @see {@link ListBoxSeparatorProps} for the complete list of props.
 */
export function ListBoxSeparator({ ...props }: ListBoxSeparatorProps): React.ReactElement {
  return <Separator space={{ block: "sm" }} {...props} />;
}
