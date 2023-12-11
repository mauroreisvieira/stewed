import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    skin?: 'default' | 'error' | 'success';
}

export const TextArea = React.forwardRef(
    (
        { skin, className, disabled, children, ...otherProps }: TextAreaProps,
        ref: React.Ref<HTMLTextAreaElement>
    ): React.ReactElement => {
        const rootClassName = 'text-area';
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

TextArea.displayName = 'TextArea';
