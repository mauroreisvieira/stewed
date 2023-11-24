import React, { createContext, useContext } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "TabsProvider" component is wrapping your application.');
};

interface TabsContextProps {
  /** Sets value of tab item selected. */
  value: string;
  /** Callback fired when the value changes. */
  onValueChange?: (value: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
  value: "",
  onValueChange: definitionError,
});

export const useTabsContext = (): TabsContextProps => useContext(TabsContext);

export interface TabsProviderProps extends TabsContextProps {
  children?: React.ReactNode;
}

export function TabsProvider({ value, onValueChange, children }: TabsProviderProps): React.ReactElement {
  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
