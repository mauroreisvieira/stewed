import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface BadgeProps {
    appearance?: 'info' | 'success' | 'warning' | 'danger';
    count?: string;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    appearance = 'info',
    count,
    className,
    children,
}): React.ReactElement => {
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
