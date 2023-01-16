import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface BadgeProps {
    skin?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    count?: string;
    className?: string;
    children: React.ReactNode;
}

export const Badge = ({
    skin = 'primary',
    count,
    className,
    children,
}: BadgeProps): React.ReactElement => {
    const rootClassName = 'badge';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            className
        ),
        count: styles[`${rootClassName}__count`],
    };
    return (
        <div className={cssClasses.root}>
            {children}
            <span className={cssClasses.count}>{count}</span>
        </div>
    );
};
