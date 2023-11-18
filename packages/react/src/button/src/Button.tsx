import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
import { type DistributiveOmit, fixedForwardRef } from '@stewed/react';
// Styles
import styles from './styles/index.module.scss';

const defaultElement = 'button';

export interface ButtonProps<T>
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    as?: T;
    /** Change the visual style of the button. */
    skin?: 'primary' | 'secondary' | 'danger';
    /** Change the visual appearance of the button. */
    variant?: 'filled' | 'ghost' | 'outline';
    /** Changes the size of the button, giving it more or less padding. */
    size?: 'sm' | 'md' | 'lg';
    /** Slot for icon to display before the button text. */
    leftIcon?: React.ReactNode;
    /** Slot for icon to display after the button text. */
    rightIcon?: React.ReactNode;
    /** Allows the button to grow to the width of its container. */
    fullWidth?: boolean;
    /** Hide content and show only the icon. */
    iconOnly?: boolean;
    /** Disables the button, disallowing merchant interaction. */
    disabled?: boolean;
    /** The content to display inside the button. */
    children: React.ReactNode;
}

/**
 * This component displays an button component.
 * Button component is used to trigger an action or event,
 * such as submitting a form, opening a Dialog, canceling an action,
 * or performing a delete operation.
 *
 * @example
 * ```tsx
 * <Button skin="secondary">Button</Button>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {React.ReactElement} - The rendered Button component.
 */
export const UnwrappedButton = <T extends React.ElementType>(
    {
        skin = 'primary',
        variant = 'filled',
        size = 'md',
        leftIcon,
        rightIcon,
        as,
        fullWidth,
        className,
        iconOnly,
        children,
        ...restProps
    }: ButtonProps<T> &
        DistributiveOmit<
            React.ComponentPropsWithRef<
                React.ElementType extends T ? 'button' : T
            >,
            'as'
        >,
    ref: React.ForwardedRef<unknown>
): React.ReactElement => {
    const rootClassName = 'button';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            styles[`${rootClassName}--${variant}`],
            styles[`${rootClassName}--${size}`],
            iconOnly && styles[`${rootClassName}--icon-only`],
            fullWidth && styles[`${rootClassName}--fullWidth`],
            restProps.disabled &&
                styles[`${rootClassName}--${restProps.disabled}`],
            className
        ),
        left: classNames(styles[`${rootClassName}__left`]),
        text: classNames(styles[`${rootClassName}__text`]),
        right: classNames(styles[`${rootClassName}__right`]),
    };
    const ComputedTag = as || defaultElement;

    return (
        <ComputedTag ref={ref} {...restProps} className={cssClasses.root}>
            {leftIcon && <span className={cssClasses.left}>{leftIcon}</span>}
            {children && <span className={cssClasses.text}>{children}</span>}
            {rightIcon && <span className={cssClasses.right}>{rightIcon}</span>}
        </ComputedTag>
    );
};

UnwrappedButton.displayName = 'Button';

export const Button = fixedForwardRef(UnwrappedButton);
