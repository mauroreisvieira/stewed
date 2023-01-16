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

    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            className
        ),
        title: styles[`${rootClassName}__title`],
        body: styles[`${rootClassName}__body`],
    };

    return (
        <div className={cssClasses.root} role="alert">
            {title && <div className={cssClasses.title}>{title}</div>}
            <div className={cssClasses.body}>{children}</div>
        </div>
    );
};
