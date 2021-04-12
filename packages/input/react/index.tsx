import classNames from 'classnames';
import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    skin?: 'primary' | 'success' | 'danger' | 'warning';
    disabled?: boolean;
}

export const Input = React.forwardRef(
    (
        {
            skin = 'primary',
            disabled = false,
            ...otherProps
        }: InputProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const { className, onChange } = otherProps;
        const rootClassName = 'input';
        const computedClasses = classNames(rootClassName, className, {
            [`${rootClassName}--${skin}`]: skin
        });

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
