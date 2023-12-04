import React, { forwardRef } from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    skin?: 'primary' | 'error';
    size?: 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef(
    (
        {
            skin = 'primary',
            size = 'md',
            className,
            disabled,
            ...otherProps
        }: RadioProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const rootClassName = 'radio';
        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                disabled && styles[`${rootClassName}--disabled`],
                styles[`${rootClassName}--${size}`],
                styles[`${rootClassName}--${skin}`],
                className
            ),
            control: styles[`${rootClassName}__control`],
            background: styles[`${rootClassName}__background`],
        };

        return (
            <div className={cssClasses.root}>
                <input
                  ref={ref}
                  type="radio"
                  disabled={disabled}
                  className={cssClasses.control}
                  {...otherProps}
                />
                <span className={cssClasses.background} />
            </div>
        );
    }
);

Radio.displayName = 'Radio';