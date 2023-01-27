import React, { forwardRef } from 'react';
import {
    classNames,
    PolymorphicPropsWithRef,
    PolymorphicForwardRefExoticComponent,
} from '@stewed/utils';

import styles from './Base.module.scss';

const defaultElement = 'button';

export interface ButtonOwnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Change the visual style of the button. */
    skin?: 'primary' | 'secondary' | 'danger';
    /** Change the visual appearance of the button. */
    variant?: 'filled' | 'ghost' | 'outline' ;
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

export type ButtonProps<T extends React.ElementType = typeof defaultElement> =
    PolymorphicPropsWithRef<ButtonOwnProps, T>;

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
 * @param props - ButtonProps
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 */
export const Button: PolymorphicForwardRefExoticComponent<
    ButtonProps,
    typeof defaultElement
> = forwardRef(
    <T extends React.ElementType = typeof defaultElement>(
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
            ...otherProps
        }: PolymorphicPropsWithRef<ButtonProps, T>,
        ref: React.ComponentPropsWithRef<T>['ref']
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
                otherProps.disabled &&
                    styles[`${rootClassName}--${otherProps.disabled}`],
                className
            ),
            left: classNames(styles[`${rootClassName}__left`]),
            right: classNames(styles[`${rootClassName}__right`]),
        };
        const ComputedTag = as || defaultElement;

        return (
            <ComputedTag ref={ref} className={cssClasses.root} {...otherProps}>
                {leftIcon && <span className={cssClasses.left}>{leftIcon}</span>}
                {children}
                {rightIcon && <span className={cssClasses.right}>{rightIcon}</span>}
            </ComputedTag>
        );
    }
);

Button.displayName = 'Button';
