import React from 'react';
// Context
import { useTabsContext } from './TabsContext';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface TabsPanelProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** Sets or retrieves the value of a tab panel. */
    value: string;
}

export const TabsPanel = ({
    value: receivedValue,
    className,
    children,
    ...otherProps
}: TabsPanelProps): React.ReactElement => {
    const { value } = useTabsContext();

    const isSelected = value === receivedValue;
    const rootClassName = 'tabs__panel';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root} role="tabpanel" {...otherProps} hidden={!isSelected}>
            {children}
        </div>
    );
};
