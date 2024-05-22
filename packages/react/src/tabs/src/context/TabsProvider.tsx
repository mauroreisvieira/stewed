import React from "react";
import { TabsContext, type TabsContextProps } from "./TabsContext";

export interface TabsProviderProps extends TabsContextProps {
  children?: React.ReactNode;
}

export function TabsProvider({
  value,
  onValueChange,
  children,
}: TabsProviderProps): React.ReactElement {
  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange,
      }}>
      {children}
    </TabsContext.Provider>
  );
}
