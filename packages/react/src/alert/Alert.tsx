import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Will render the bold text shown at the top of the alert. */
    title?: string;
    /** Change the visual style of the alert. */
    skin?: 'info' | 'success' | 'warning' | 'danger';
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
 * @param props - AlertProps
 */
export const Alert = ({
    title,
    skin = 'info',
    className,
    children,
    ...restProps
}: AlertProps): React.ReactElement => {
    const rootClassName = 'alert';

    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            className
        ),
        title: styles[`${rootClassName}__title`],
        body: styles[`${rootClassName}__body`],
    };

    return (
        <div {...restProps} className={cssClasses.root} role="alert">
            {title && <div className={cssClasses.title}>{title}</div>}
            <div className={cssClasses.body}>{children}</div>
        </div>
    );
};
