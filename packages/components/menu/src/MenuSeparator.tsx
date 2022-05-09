import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface SeparatorProps {
    className?: string;
}

export const MenuSeparator = ({
    className,
    children,
}: React.PropsWithChildren<SeparatorProps>): React.ReactElement => {
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
