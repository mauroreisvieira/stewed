import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface AlertProps {
    title?: string;
    skin?: 'info' | 'success' | 'warning' | 'danger';
    className?: string;
    children?: React.ReactNode;
}

export const Alert = ({
    title,
    skin = 'info',
    className,
    children,
}: AlertProps): React.ReactElement => {
    const rootClassName = 'alert';

    const computedClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            className
        ),
        title: styles[`${rootClassName}__title`],
        body: styles[`${rootClassName}__body`],
    };

    return (
        <div className={computedClasses.root} role="alert">
            {title && <div className={computedClasses.title}>{title}</div>}
            <div className={computedClasses.body}>{children}</div>
        </div>
    );
};
