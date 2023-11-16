import * as React from 'react';
import { classNames } from '@stewed/utilities';

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
