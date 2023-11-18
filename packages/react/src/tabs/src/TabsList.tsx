import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface TabsListProps extends React.HTMLAttributes<HTMLElement> {}

export const TabsList = ({
    className,
    children,
    ...otherProps
}: TabsListProps): React.ReactElement => {
    const rootClassName = 'tabs__list';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root} role="tablist" {...otherProps}>
            {children}
        </div>
    );
};
