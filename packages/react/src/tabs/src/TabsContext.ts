import { createContext, useContext } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "TabsProvider" component is wrapping your component.');
};

export interface TabsContextProps {
  /** Sets value of tab item selected. */
  value: unknown;
  /** Callback fired when the value changes. */
  onValueChange?: (value: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
  value: "",
  onValueChange: definitionError,
});

export const useTabs = (): TabsContextProps => useContext(TabsContext);
