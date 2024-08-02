import React from "react";
import { TabsContext, type TabsContextProps } from "./TabsContext";

export interface TabsProviderProps extends TabsContextProps {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function TabsProvider({ children, ...props }: TabsProviderProps): React.ReactElement {
  return <TabsContext.Provider value={props}>{children}</TabsContext.Provider>;
}
