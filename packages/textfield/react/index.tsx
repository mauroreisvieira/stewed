import * as React from 'react';
import classNames from 'classnames';

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    skin?: 'primary' | 'success' | 'danger' | 'warning';
    disabled?: boolean;
}

export const Textfield = React.forwardRef(
    (
        {
            skin = 'primary',
            disabled = false,
            ...otherProps
        }: TextfieldProps,
        ref: React.Ref<HTMLInputElement>
    ): React.ReactElement => {
        const { className, onChange } = otherProps;
        const rootClassName = 'textfield';
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

Textfield.displayName = 'Textfield';
