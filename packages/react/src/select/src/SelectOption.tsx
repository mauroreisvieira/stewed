import React from "react";

/**
 * Props for the SelectOption component.
 * Extends standard HTML option element props.
 */
export type SelectOptionProps = React.ComponentPropsWithoutRef<"option">;

/**
 * A component that renders an HTML option element for use within select elements.

 * @param props - Standard HTML option attributes
 * @returns A React option element

 * @see {@link SelectOptionProps} for more details on the available props.
 */
export function SelectOption({ children, ...props }: SelectOptionProps): React.ReactElement {
  return <option {...props}>{children}</option>;
}
