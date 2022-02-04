import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface AlertProps {
    appearance: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    appearance = 'primary',
    className,
    children,
}): React.ReactElement => {
    const rootClassName = 'alert';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${appearance}`
    );
    return <div className={computedClasses}>{children}</div>;
};
