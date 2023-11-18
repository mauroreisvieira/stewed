import React from 'react';
// Compound Component
import { MenuGroup } from './MenuGroup';
import { MenuItem } from './MenuItem';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './Base.module.scss';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The content to display inside the menu. */
    children: React.ReactNode;
}

export const Menu = ({
    className,
    children,
    ...otherProps
}: MenuProps): React.ReactElement => {
    const rootClassName = 'menu';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };
    return (
        <div className={cssClasses.root} role="menu" {...otherProps}>
            {children}
        </div>
    );
};


// Compound component composition
Menu.Item = MenuItem;
Menu.Group = MenuGroup;
