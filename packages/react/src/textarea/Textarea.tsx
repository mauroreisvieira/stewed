import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    skin?: 'default' | 'error' | 'success' | 'warning';
}

export const Textarea = React.forwardRef(
    (
        { skin, className, disabled, ...otherProps }: TextareaProps,
        ref: React.Ref<HTMLTextAreaElement>
    ): React.ReactElement => {
        const rootClassName = 'textarea';
        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                disabled && `${styles[rootClassName]}--disabled`,
                skin !== 'default' && styles[`${rootClassName}--${skin}`],
                className
            ),
        };

        return (
            <textarea
                ref={ref}
                className={cssClasses.root}
                disabled={disabled}
                {...otherProps}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
