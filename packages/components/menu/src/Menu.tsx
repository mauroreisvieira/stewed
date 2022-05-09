import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface MenuProps {
    className?: string;
}

export const Menu = ({
    className,
    children,
}: React.PropsWithChildren<MenuProps>): React.ReactElement => {
    const rootClassName = 'menu';
    const computedClasses = classNames(
        rootClassName,
        className,
    );
    return (
        <ul className={computedClasses} role="menu">
            {children}
        </ul>
    );
};
