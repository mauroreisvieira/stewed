import React from "react";
import { AccordionContext, type AccordionContextProps } from "./AccordionContext";

export interface AccordionProviderProps extends AccordionContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function AccordionProvider({
  children,
  ...props
}: AccordionProviderProps): React.ReactElement {
  return <AccordionContext.Provider value={props}>{children}</AccordionContext.Provider>;
}
