import React from "react";
import { AccordionContext, type AccordionContextProps } from "./AccordionContext";

export interface AccordionProviderProps extends AccordionContextProps {
  children?: React.ReactNode;
}

export function AccordionProvider({
  open,
  setOpen,
  children,
}: AccordionProviderProps): React.ReactElement {
  return (
    <AccordionContext.Provider
      value={{
        open,
        setOpen,
      }}>
      {children}
    </AccordionContext.Provider>
  );
}
