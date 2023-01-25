import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    skin?: 'default' | 'error' | 'success';
}

export const Input = React.forwardRef(
    (
        { skin, className, disabled, ...otherProps }: InputProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const rootClassName = 'input';
        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                disabled && `${styles[rootClassName]}--disabled`,
                skin !== 'default' && styles[`${rootClassName}--${skin}`],
                className
            ),
        };

        return (
            <input
                ref={ref}
                className={cssClasses.root}
                disabled={disabled}
                {...otherProps}
            />
        );
    }
);

Input.displayName = 'Input';
