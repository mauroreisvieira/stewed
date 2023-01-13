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
                <span className={cssClasses.background} />
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
