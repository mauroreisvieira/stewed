import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface ProgressProps
    extends React.ProgressHTMLAttributes<HTMLProgressElement> {
    /** Change the visual style of the progress bar. */
    skin?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    /** Changes the size of the progress bar, giving it more or less padding. */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /** Allows the progress bar to have rounded corners. */
    rounded?: boolean;
}

/**
 * This component displays an progress component.
 * Bar displaying progress for a task that takes a long time or consists of several steps.
 *
 * @example
 * ```tsx
 * <Progress value={50} size="sm" />
 * ```
 *
 * @param props - ProgressProps
 * @remarks This component props extended from React.ProgressHTMLAttributes<HTMLProgressElement>.
 */
export const Progress = ({
    skin = 'primary',
    size = 'sm',
    rounded = true,
    value,
    max = 100,
    className,
    ...otherProps
}: ProgressProps): React.ReactElement => {
    const rootClassName = 'progress';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            styles[`${rootClassName}--${size}`],
            rounded && styles[`${rootClassName}--rounded`],
            className
        ),
        control: styles[`${rootClassName}__control`],
    };
    return (
        <div className={cssClasses.root}>
            <progress {...otherProps} value={value} max={max} className={cssClasses.control} />
        </div>
    );
};
