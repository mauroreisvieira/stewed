import * as React from 'react';
import { classNames } from '@stewed/utils';
import { useTabsContext } from './TabsContext';
import styles from './Base.module.scss';

export interface TabItemProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    /** Slot to display before the item children. */
    leftSlot?: React.ReactNode;
    /** Slot to display after the item children. */
    rightSlot?: React.ReactNode;
    children?: React.ReactNode;
}

export const TabItem = ({
    value,
    disabled,
    leftSlot,
    rightSlot,
    className,
    onClick,
    children,
    ...otherProps
}: TabItemProps): React.ReactElement => {
    const { onChange, selected } = useTabsContext();

    const isSelected = selected === value;
    const rootClassName = 'tab__item';
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

        if (onClick) onClick(event);
        onChange(value);
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
