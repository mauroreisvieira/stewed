import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonType {
    /** Change the visual style of the button. */
    skin?: 'primary' | 'secondary' | 'danger';
    /** Changes the size of the button, giving it more or less padding. */
    size?: 'sm' | 'md' | 'lg';
    /** Allows the button to grow to the width of its container. */
    fullWidth?: boolean;
    /** Disables the button, disallowing merchant interaction. */
    disabled?: boolean;
    /** The content to display inside the button. */
    children: React.ReactNode;
}

/**
 * This component displays an button component.
 * Use button for the main actions on a page or form.
 *
 * @example
 * ```tsx
 * <Button skin="secondary">Button</Button>
 * ```
 *
 * @param props - ButtonProps
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 */
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
