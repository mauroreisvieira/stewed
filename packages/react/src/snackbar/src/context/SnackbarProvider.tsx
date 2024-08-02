import React from "react";
import { SnackbarContext, type SnackbarContextProps } from "./SnackbarContext";

export interface SnackbarProviderProps extends SnackbarContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function SnackbarProvider({
  children,
  ...props
}: SnackbarProviderProps): React.ReactElement {
  return <SnackbarContext.Provider value={props}>{children}</SnackbarContext.Provider>;
}
