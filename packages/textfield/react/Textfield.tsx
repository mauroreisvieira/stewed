import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface TextfieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    appearance?: 'primary' | 'success' | 'danger' | 'warning';
}

export const Textfield = React.forwardRef(
    (
        { appearance = 'primary', ...otherProps }: TextfieldProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const { className, onChange, disabled } = otherProps;
        const rootClassName = 'textfield';
        const computedClasses = classNames(
            rootClassName,
            className,
            `${rootClassName}--${appearance}`
        );

        const handleClick = (
            event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            if (disabled) return;
            if (onChange) onChange(event);
        };

        const computedProps = {
            ...otherProps,
            ref,
            disabled,
            className: computedClasses,
            onChange: handleClick,
        };

        return <input {...computedProps} />;
    }
);

Textfield.displayName = 'Textfield';
