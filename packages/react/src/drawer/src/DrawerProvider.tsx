import React from "react";
import { DrawerContext, type DrawerContextProps } from "./DrawerContext";

export interface DrawerProviderProps extends DrawerContextProps {
  children?: React.ReactNode;
}

export function DrawerProvider({ onClose, children }: DrawerProviderProps): React.ReactElement {
  return (
    <DrawerContext.Provider
      value={{
        onClose,
      }}>
      {children}
    </DrawerContext.Provider>
  );
}
