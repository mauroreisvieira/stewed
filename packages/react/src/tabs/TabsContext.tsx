import { createContext, useContext } from 'react';

const definitionError = (): null => {
    throw new Error(
        'Please make sure "TabsProvider" component is wrapping your application.'
    );
};

export interface TabsContextProps {
    selected: string;
    onChange: (value: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
    selected: '',
    onChange: definitionError,
});

export const useTabsContext = (): TabsContextProps => useContext(TabsContext);
