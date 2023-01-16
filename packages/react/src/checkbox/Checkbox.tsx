import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    skin?: 'default' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = React.forwardRef(
    (
        {
            skin = 'default',
            size = 'md',
            className,
            disabled,
            ...otherProps
        }: CheckboxProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const rootClassName = 'checkbox';
        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                disabled && styles[`${rootClassName}--disabled`],
                size !== 'md' && styles[`${rootClassName}--${size}`],
                skin !== 'default' && styles[`${rootClassName}--${skin}`],
                className
            ),
            control: styles[`${rootClassName}__control`],
            background: styles[`${rootClassName}__background`],
        };

        return (
            <div className={cssClasses.root}>
                <input
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    className={cssClasses.control}
                    {...otherProps}
                />
                <span className={cssClasses.background}>
                    <svg
                        viewBox="0 0 20 20"
                        focusable="false"
                        aria-hidden="true"
                    >
                        <path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z"></path>
                    </svg>
                </span>
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
