import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface TagProps {
    appearance?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    count?: string;
    className?: string;
}

export const Tag: React.FC<TagProps> = ({
    appearance = 'primary',
    className,
    children,
}): React.ReactElement => {
    const rootClassName = 'tag';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${appearance}`
    );
    return (
        <div className={computedClasses}>
            {children}
        </div>
    );
};
