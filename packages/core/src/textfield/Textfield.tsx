import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface TextfieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    skin?: 'default' | 'error' | 'success' | 'warning';
}

export const Textfield = React.forwardRef(
    (
        { skin, className, disabled, ...otherProps }: TextfieldProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const rootClassName = 'textfield';
        const computedClasses = classNames(
            styles[rootClassName],
            disabled && `${styles[rootClassName]}--disabled`,
            skin !== 'default' && styles[`${rootClassName}--${skin}`],
            className
        );

        return (
            <input
                ref={ref}
                className={computedClasses}
                disabled={disabled}
                {...otherProps}
            />
        );
    }
);

Textfield.displayName = 'Textfield';
