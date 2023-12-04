import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Will render the bold text shown at the top of the alert. */
    title?: string;
    /**
     * Change the visual style of the alert.
     * @default info
     */
    skin?: 'info' | 'success' | 'warning' | 'error';
    /** Slot to display before the alert content. */
    leftSlot?: React.ReactNode;
    /** Slot to display after the alert content. */
    rightSlot?: React.ReactNode;
}

/**
 * This component displays an alert component.
 * Alerts component are used to communicate a state that affects a system, feature or page.
 *
 * @example
 * ```tsx
 * <Alert
 *   skin="info"
 *   title="Are you absolutely sure?">
 *     This action cannot be undone...
 * </Alert>
 * ```
 *
 * @param {AlertProps} props - The props for the Alert component.
 * @returns {React.ReactElement} - The rendered Alert component.
 */
export function Alert({
    title,
    skin = 'info',
    className,
    leftSlot,
    rightSlot,
    children,
    ...props
}: AlertProps): React.ReactElement {
    const rootClassName = 'alert';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            className
        ),
        title: styles[`${rootClassName}__title`],
        body: styles[`${rootClassName}__body`],
        wrapper: styles[`${rootClassName}__wrapper`],
        left: styles[`${rootClassName}__left`],
        right: styles[`${rootClassName}right`],
    };

    return (
        <div className={cssClasses.root} role="alert" {...props} >
            {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
            <div className={cssClasses.wrapper}>
                {title && <div className={cssClasses.title}>{title}</div>}
                <div className={cssClasses.body}>{children}</div>
            </div>
            {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
        </div>
    );
}