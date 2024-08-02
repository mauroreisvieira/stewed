import React from "react";
import { DrawerContext, type DrawerContextProps } from "./DrawerContext";

export interface DrawerProviderProps extends DrawerContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function DrawerProvider({ children, ...props }: DrawerProviderProps): React.ReactElement {
  return <DrawerContext.Provider value={props}>{children}</DrawerContext.Provider>;
}
