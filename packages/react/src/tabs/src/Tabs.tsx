import React from 'react';
// Context
import { TabsContext, TabsContextProps } from './TabsContext';
//. Compound Component
import { TabsItem } from './TabsItem';
import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './scss/index.module.scss';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
    /** Sets value of tab item selected. */
    value: TabsContextProps['value'];
    /** Callback fired when the value changes. */
    onValueChange?: TabsContextProps['onValueChange'];
}

export const Tabs = ({
    value,
    className,
    onValueChange,
    children,
    ...otherProps
}: TabsProps): React.ReactElement => {
    const rootClassName = 'tabs';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root} {...otherProps}>
            <TabsContext.Provider
                value={{
                    value,
                    onValueChange,
                }}
            >
                {children}
            </TabsContext.Provider>
        </div>
    );
};

// Compound component composition
Tabs.Item = TabsItem;
Tabs.List = TabsList;
Tabs.Panel = TabsPanel;
