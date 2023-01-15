import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonType {
    skin?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef(
    (
        {
            skin = 'primary',
            size = 'md',
            disabled = false,
            children,
            href,
            className,
            onClick,
            ...otherProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement & HTMLAnchorElement>
    ): React.ReactElement => {
        const rootClassName = 'button';
        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                styles[`${rootClassName}--${skin}`],
                styles[`${rootClassName}--${size}`],
                disabled && styles[`${rootClassName}--${disabled}`],
                className
            ),
        };

        let Tag = 'button';

        const handleClick = (
            event: React.MouseEvent<HTMLButtonElement>
        ): void => {
            if (disabled) return;
            if (onClick) onClick(event);
        };

        let computedProps = {
            ...otherProps,
            ref,
            className: cssClasses.root,
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

        return <Tag {...computedProps}>{children}</Tag>;
    }
);

Button.displayName = 'Button';
