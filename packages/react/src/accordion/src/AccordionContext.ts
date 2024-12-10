import { createContext, use } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "<Accordion>" component is wrapping your component.');
};

export interface AccordionContextProps {
  /**
   * Whether multiple items can be expanded at the same time.
   * @default false
   */
  multipleExpanded?: boolean;
  /**
   * Callback function triggered when the open state changes.
   * This function is called with the updated `open` array whenever the state changes.
   *
   * @param values - The updated array of open items (values).
   */
  onOpenChange?: (values: string[]) => void;
  /**
   * The current open state of the accordion items.
   * This is an array of item values that are currently expanded or "open" in the accordion.
   * Each value corresponds to a unique identifier for an open accordion item.
   *
   * @remarks This property is used internally to manage the state of expanded items in the accordion.
   */
  open: string[];
  /**
   * Setter function for updating the open state of the accordion items.
   * It accepts a new array of strings that represents the updated open state of the accordion.
   * This function is used to add or remove items from the `open` state, based on user interactions.
   *
   * @remarks This function is used internally to modify the `open` state in response to user actions such as
   * clicking an accordion item.
   */
  setOpen: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AccordionContext = createContext<AccordionContextProps>({
  multipleExpanded: false,
  open: [],
  setOpen: definitionError,
  onOpenChange: definitionError,
});

export const useAccordion = (): AccordionContextProps => use(AccordionContext);
