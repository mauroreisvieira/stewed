import React from "react";
import { TabsContext, type TabsContextProps } from "./TabsContext";

export interface TabsProviderProps<T extends string> extends TabsContextProps<T> {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function TabsProvider<T extends string>({
  children,
  ...props
}: TabsProviderProps<T>): React.ReactElement {
  return (
    <TabsContext.Provider value={props as unknown as TabsContextProps<string>}>
      {children}
    </TabsContext.Provider>
  );
}
