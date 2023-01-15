import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface SeparatorProps {
    className?: string;
}

export const MenuSeparator = ({
    className,
    children,
}: React.PropsWithChildren<SeparatorProps>): React.ReactElement => {
    const rootClassName = 'menu__separator';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <li className={cssClasses.root} role="separator" tabIndex={-1}>
            {children}
        </li>
    );
};
