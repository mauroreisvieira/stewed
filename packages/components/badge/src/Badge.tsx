import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface BadgeProps {
    appearance?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    count?: string;
    className?: string;
}

export const Badge = ({
    appearance = 'primary',
    count,
    className,
    children,
}: React.PropsWithChildren<BadgeProps>): React.ReactElement => {
    const rootClassName = 'badge';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${appearance}`
    );
    return (
        <div className={computedClasses}>
            {children}
            <span className={`${rootClassName}__count`}>
                { count }
            </span>
        </div>
    );
};
