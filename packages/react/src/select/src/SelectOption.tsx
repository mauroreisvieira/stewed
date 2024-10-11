import React from "react";

export interface SelectOptionProps extends React.ComponentPropsWithoutRef<"option"> {}

export function SelectOption({ children, ...props }: SelectOptionProps): React.ReactElement {
  return <option {...props}>{children}</option>;
}
