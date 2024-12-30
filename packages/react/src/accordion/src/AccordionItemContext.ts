import { createContext, use } from "react";

/**
 * The context props for the `AccordionItem` component.
 * This interface defines the properties available in the `AccordionItemContext`.
 */
export interface AccordionItemContextProps {
  /**
   * A unique identifier for the accordion item.
   * Used to track which accordion item is open, typically to manage the accordion's open/closed state in a collection of items.
   */
  value: string;
  /** Indicates whether the item is disabled. */
  disabled?: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextProps>({
  value: "",
  disabled: false
});

/**
 * This hook provides access to the current state and properties of the `AccordionItem` component.
 *
 * @see {@link AccordionItemContextProps} for more details on the available props.
 *
 * @returns {AccordionItemContextProps} The context properties for the `AccordionItem
 */
export const useAccordionItem = (): AccordionItemContextProps => use(AccordionItemContext);
