import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface RadioProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    size?: 'md' | 'lg';
}

export const Radio = React.forwardRef(
    (
        { size = 'md', ...otherProps }: RadioProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const { className, onChange, disabled } = otherProps;
        const rootClassName = 'radio';
        const computedClasses = classNames(
            rootClassName,
            className,
            disabled && `${rootClassName}--disabled`,
            size !== 'md' && `${rootClassName}--${size}`
        );

        const onHandleChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            if (disabled) return;
            if (onChange) onChange(event);
        };

        const computedProps = {
            ...otherProps,
            ref,
            disabled,
            type: 'radio',
            onChange: onHandleChange,
        };

        return (
            <div className={computedClasses}>
                <input className={`${rootClassName}__control`} {...computedProps} />
                <div className={`${rootClassName}__background`} />
            </div>
        );
    }
);

Radio.displayName = 'Radio';
