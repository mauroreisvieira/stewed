import React from "react";
import { DialogContext, type DialogContextProps } from "./DialogContext";

export interface DialogProviderProps extends DialogContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function DialogProvider({ onClose, children }: DialogProviderProps): React.ReactElement {
  return (
    <DialogContext.Provider
      value={{
        onClose,
      }}>
      {children}
    </DialogContext.Provider>
  );
}
