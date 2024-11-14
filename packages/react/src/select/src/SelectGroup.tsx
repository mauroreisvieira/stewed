import React from "react";

export interface SelectOptionProps
  extends Omit<React.ComponentPropsWithoutRef<"optgroup">, "label"> {
  /** The title of the group, typically displayed as a heading for the grouped items. */
  title: string;
}

export function SelectGroup({ title, children, ...props }: SelectOptionProps): React.ReactElement {
  return (
    <optgroup label={title} {...props}>
      {children}
    </optgroup>
  );
}
