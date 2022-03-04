import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface SeparatorProps {
    className?: string;
}

export const MenuSeparator: React.FC<SeparatorProps> = ({
    className,
    children,
}): React.ReactElement => {
    const rootClassName = 'menu__separator';
    const computedClasses = classNames(
        rootClassName,
        className,
    );
    return (
        <li className={computedClasses} role="separator" tabIndex={-1}>
            {children}
        </li>
    );
};
