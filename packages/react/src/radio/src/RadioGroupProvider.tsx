import React from "react";
import { RadioGroupContext, type RadioGroupContextProps } from "./RadioGroupContext";

export interface RadioGroupProviderProps extends RadioGroupContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function RadioGroupProvider({
  children,
  ...props
}: RadioGroupProviderProps): React.ReactElement {
  return <RadioGroupContext.Provider value={props}>{children}</RadioGroupContext.Provider>;
}
