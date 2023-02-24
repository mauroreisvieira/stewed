import * as React from 'react';
import { classNames } from '@stewed/utils';

import { TabsContext, TabsContextProps } from './TabsContext';

import styles from './Base.module.scss';

export interface TabsProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Sets value of tab item selected. */
    selected: TabsContextProps['selected'];
    /** Callback fired when the Tab is changed. */
    onChange: TabsContextProps['onChange'];
}

export const Tabs = ({
    selected,
    className,
    onChange,
    children,
    ...otherProps
}: TabsProps): React.ReactElement => {
    const rootClassName = 'tabs';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <nav className={cssClasses.root} role="tablist" {...otherProps}>
            <TabsContext.Provider
                value={{
                    selected,
                    onChange,
                }}
            >
                {children}
            </TabsContext.Provider>
        </nav>
    );
};
