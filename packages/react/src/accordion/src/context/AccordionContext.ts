import React, { createContext, useContext } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "AccordionProvider" component is wrapping your component.');
};

export interface AccordionContextProps {
  /** The open state of the accordion item. */
  open: boolean;
  /** Setter function for updating the open state of the accordion. */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccordionContext = createContext<AccordionContextProps>({
  open: false,
  setOpen: definitionError,
});

export const useAccordion = (): AccordionContextProps => useContext(AccordionContext);
