import classNames from 'classnames';
import * as React from 'react';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonType {
    skin?: 'primary' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef(
    (
        {
            skin = 'primary',
            size = 'md',
            rounded = false,
            disabled = false,
            children,
            ...otherProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement & HTMLAnchorElement>
    ): React.ReactElement => {
        const { href, className, onClick } = otherProps;
        let Tag = 'button';
        const rootClassName = 'button';
        const computedClasses = classNames(rootClassName, className, {
            [`${rootClassName}--${skin}`]: skin,
            [`${rootClassName}--${size}`]: size,
            [`${rootClassName}--rounded`]: rounded,
            'is-disabled': disabled,
        });

        const handleClick = (
            event: React.MouseEvent<HTMLButtonElement>
        ): void => {
            if (disabled) return;
            if (onClick) onClick(event);
        };

        let computedProps = {
            ...otherProps,
            ref,
            className: computedClasses,
            onClick: handleClick,
        };

        if (href) {
            Tag = 'a';
            computedProps = {
                ...computedProps,
                ...{
                    tabIndex: disabled ? -1 : undefined,
                    href,
                },
            };
        } else {
            computedProps = {
                ...computedProps,
                ...{
                    disabled,
                },
            };
        }

        return <Tag {...computedProps}>{ children }</Tag>;
    }
);

Button.displayName = 'Button';
