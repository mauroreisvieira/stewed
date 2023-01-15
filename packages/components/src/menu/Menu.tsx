import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface MenuProps {
    className?: string;
    /** The content to display inside the menu. */
    children: React.ReactNode;
}

export const Menu = ({
    className,
    children,
}: MenuProps): React.ReactElement => {
    const rootClassName = 'menu';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };
    return (
        <ul className={cssClasses.root} role="menu">
            {children}
        </ul>
    );
};
