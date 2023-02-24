import { createContext, useContext } from 'react';

const definitionError = (): null => {
    throw new Error(
        'Please make sure "TabsProvider" component is wrapping your application.'
    );
};

export interface TabsContextProps {
    value: string;
    onValueChange?: (value: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
    value: '',
    onValueChange: definitionError,
});

export const useTabsContext = (): TabsContextProps => useContext(TabsContext);
