import React from "react";
import { CheckboxGroupContext, type CheckboxGroupContextProps } from "./CheckboxGroupContext";

export interface CheckboxGroupProviderProps extends CheckboxGroupContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function CheckboxGroupProvider({
  children,
  ...props
}: CheckboxGroupProviderProps): React.ReactElement {
  return <CheckboxGroupContext.Provider value={props}>{children}</CheckboxGroupContext.Provider>;
}
