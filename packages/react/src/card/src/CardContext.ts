import { use, createContext } from "react";

export interface CardContextProps {
  /**
   * The direction of the card.
   * @default column
   */
  direction?: "row" | "column";
}

/**
 * Creates a card context with the specified generic type.
 *
 * This function initializes a context for managing Card within the application.
 * It provides default values and setters for card-related operations.
 *
 * @returns A new card context with the specified generic type.
 */
function createCardContext() {
  return createContext<CardContextProps>({
    direction: "column",
  });
}

/**
 * Default context for managing Card.
 *
 * This context provides functionalities to manage Card across the application.
 * It includes default values and setters for card-related operations.
 */
export const CardContext = createCardContext();

/**
 * Hook to conveniently use the card context.
 *
 * @returns Card context values.
 */
export function useCard() {
  return use(CardContext);
}
