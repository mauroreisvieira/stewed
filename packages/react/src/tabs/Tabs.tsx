import * as React from 'react';
import { classNames } from '@stewed/utils';

import { TabsContext, TabsContextProps } from './TabsContext';

import styles from './Base.module.scss';

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
