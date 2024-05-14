import { createContext, useContext } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "TabsProvider" component is wrapping your component.');
};

export interface TabsContextProps {
  /** Sets value of tab item selected. */
  value: string | undefined;
  /** Callback fired when the value changes. */
  onValueChange?: (value: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
  value: undefined,
  onValueChange: definitionError,
});

export const useTabs = (): TabsContextProps => useContext(TabsContext);
