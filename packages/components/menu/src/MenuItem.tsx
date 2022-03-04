import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface MenuItemProps {
    appearance?: 'default' | 'danger';
    className?: string;
    selected?: boolean;
    disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    className,
    appearance = 'default',
    selected,
    disabled,
    children,
}): React.ReactElement => {
    const rootClassName = 'menu__item';
    const computedClasses = classNames(
        rootClassName,
        className,
        appearance !== 'default' && `${rootClassName}--${appearance}`,
        selected && `${rootClassName}--selected`,
        disabled && `${rootClassName}--disabled`,
    );
    return (
        <li className={computedClasses} role="menuitem" tabIndex={disabled ? -1 : 0}>
            {children}
        </li>
    );
};
