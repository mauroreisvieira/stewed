import React from "react";

/**
 * Interface for the props of the SelectGroup component.
 */
export interface SelectGroupProps
  extends Omit<React.ComponentPropsWithoutRef<"optgroup">, "label"> {
  /** The title of the group, typically displayed as a heading for the grouped items. */
  title: string;
}

/**
 * Component that renders an option group for select elements.

 * @param props - The component props
 * @returns A React element containing the rendered option group
 *
 * @see {@link SelectGroupProps} for more details on the available props.
 */
export function SelectGroup({ title, children, ...props }: SelectGroupProps): React.ReactElement {
  return (
    <optgroup label={title} {...props}>
      {children}
    </optgroup>
  );
}
