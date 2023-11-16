import * as React from 'react';
import { classNames } from '@stewed/utilities';

import styles from './Base.module.scss';

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Change the visual style of the menu item. */
    skin?: 'primary' | 'danger';
    /** Slot to display before the item children. */
    leftSlot?: React.ReactNode;
    /** Slot to display after the item children. */
    rightSlot?: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

export const MenuItem = ({
    className,
    skin = 'primary',
    selected,
    disabled,
    leftSlot,
    rightSlot,
    children,
}: React.PropsWithChildren<MenuItemProps>): React.ReactElement => {
    const rootClassName = 'menu__item';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            skin !== 'primary' && styles[`${rootClassName}--${skin}`],
            selected && styles[`${rootClassName}--selected`],
            disabled && styles[`${rootClassName}--disabled`],
            className
        ),
        left: classNames(styles[`${rootClassName}__left`]),
        text: classNames(styles[`${rootClassName}__text`]),
        right: classNames(styles[`${rootClassName}__right`]),
    };
    return (
        <div
          className={cssClasses.root}
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
        >
            {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
            {children && <span className={cssClasses.text}>{children}</span>}
            {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
        </div>
    );
};
