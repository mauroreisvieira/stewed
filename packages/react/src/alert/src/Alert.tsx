import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Tokens
import { components } from '../../../../tokens/src/index';
// Styles
import styles from './styles/index.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Will render the bold text shown at the top of the alert. */
    title?: string;
    /**
     * Change the visual style of the alert.
     * @default info
     */
    skin?: 'info' | 'success' | 'warning' | 'critical';
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
    const rootName = components.Alert;
    const cssClasses = {
        root: classNames(
            styles[rootName],
            styles[`${rootName}--${skin}`],
            className
        ),
        title: styles[`${rootName}__title`],
        body: styles[`${rootName}__body`],
        wrapper: styles[`${rootName}__wrapper`],
        left: styles[`${rootName}__left`],
        right: styles[`${rootName}right`],
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
