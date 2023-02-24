import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const MenuGroup = ({
    className,
    title,
    children,
}: MenuGroupProps): React.ReactElement => {
    const rootClassName = 'menu__group';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
        title: classNames(styles[`${rootClassName}__title`]),
    };

    return (
        <div className={cssClasses.root}>
            {title && <div className={cssClasses.title}>{title}</div>}
            {children}
        </div>
    );
};
