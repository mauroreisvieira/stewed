import React, { forwardRef } from 'react';
import {
    classNames,
    PolymorphicPropsWithRef,
    PolymorphicForwardRefExoticComponent,
} from '@stewed/utils';

import styles from './Base.module.scss';

const defaultElement = 'button';

export interface ButtonBaseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export type ButtonProps<T extends React.ElementType = typeof defaultElement> =
    PolymorphicPropsWithRef<ButtonBaseProps, T>;

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
export const Button: PolymorphicForwardRefExoticComponent<
    ButtonProps,
    typeof defaultElement
> = forwardRef(
    <T extends React.ElementType = typeof defaultElement>(
        {
            skin = 'primary',
            size = 'md',
            as,
            fullWidth,
            className,
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
                styles[`${rootClassName}--${size}`],
                fullWidth && styles[`${rootClassName}--fullWidth`],
                otherProps.disabled &&
                    styles[`${rootClassName}--${otherProps.disabled}`],
                className
            ),
        };
        const ComputedTag = as || defaultElement;

        return (
            <ComputedTag ref={ref} className={cssClasses.root} {...otherProps}>
                {children}
            </ComputedTag>
        );
    }
);

Button.displayName = 'Button';
