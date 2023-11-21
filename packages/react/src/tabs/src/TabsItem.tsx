import React from 'react';
// Context
import { useTabsContext } from './TabsContext';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface TabsItemProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Sets or retrieves the value of a tab list. */
    value: string;
    /** Slot to display before the item children. */
    leftSlot?: React.ReactNode;
    /** Slot to display after the item children. */
    rightSlot?: React.ReactNode;
}

export const TabsItem = ({
    value: receivedValue,
    disabled,
    leftSlot,
    rightSlot,
    className,
    onClick,
    children,
    ...otherProps
}: TabsItemProps): React.ReactElement => {
    const { onValueChange, value } = useTabsContext();

    const isSelected = value === receivedValue;
    const rootClassName = 'tabs__item';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            isSelected && styles[`${rootClassName}--selected`],
            className
        ),
        left: classNames(styles[`${rootClassName}__left`]),
        text: classNames(styles[`${rootClassName}__text`]),
        right: classNames(styles[`${rootClassName}__right`]),
    };

    const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        console.log("Hey", value);
        if (onClick) onClick(event);
        onValueChange?.(receivedValue);
    };

    return (
        <button
          role="tab"
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          aria-selected={isSelected}
          className={cssClasses.root}
          onClick={onHandleClick}
          {...otherProps}
        >
            {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
            {children && <span className={cssClasses.text}>{children}</span>}
            {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
        </button>
    );
};
