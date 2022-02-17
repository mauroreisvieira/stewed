import * as React from 'react';
import { classNames } from '@stewed/utils';

import classes from './alert.module.scss';

export interface AlertProps {
    title?: string;
    appearance?: 'info' | 'success' | 'warning' | 'danger';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    title,
    appearance = 'info',
    className,
    children,
}): React.ReactElement => {
    const rootClassName = classes.alert;
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}-${appearance}`
    );
    return (
        <div className={computedClasses} role="alert">
            { title && (
                <div className={`${rootClassName}-title`}>
                    { title }
                </div>
            ) }
            <div className={`${rootClassName}-body`}>
                {children}
            </div>
        </div>
    );
};
