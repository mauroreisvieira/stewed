import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    skin?: 'default' | 'error' | 'success';
}

export const Textarea = React.forwardRef(
    (
        { skin, className, disabled, children, ...otherProps }: TextareaProps,
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
            >
                {children}
            </textarea>
        );
    }
);

Textarea.displayName = 'Textarea';
