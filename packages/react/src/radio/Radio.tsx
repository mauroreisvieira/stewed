import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    skin?: 'default' | 'error';
    size?: 'sm' | 'md' | 'lg';
}

export const Radio = React.forwardRef(
    (
        {
            skin = 'default',
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
