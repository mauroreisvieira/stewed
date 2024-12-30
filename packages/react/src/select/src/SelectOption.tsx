import React from "react";

export type SelectOptionProps = React.ComponentPropsWithoutRef<"option">;

export function SelectOption({ children, ...props }: SelectOptionProps): React.ReactElement {
  return <option {...props}>{children}</option>;
}
