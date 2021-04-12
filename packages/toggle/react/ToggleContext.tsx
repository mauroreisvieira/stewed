import * as React from 'react';

export interface ToggleContextProps {
    selectedValue: string;
    onGroupChange: (value: string) => void;
}

export const ToggleContext = React.createContext<ToggleContextProps | undefined>(undefined);
