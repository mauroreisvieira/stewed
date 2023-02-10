import React, { forwardRef } from 'react';
import {
    classNames,
    PolymorphicPropsWithRef,
    PolymorphicForwardRefExoticComponent,
} from '@stewed/utils';

import styles from './Base.module.scss';

const defaultElement = 'p';

const SizeMap = {
    'display-1': 'h1',
    'display-2': 'h2',
    'display-3': 'h3',
    'display-4': 'h4',
    'display-5': 'h5',
    'display-6': 'h6',
    link: 'a',
    base: 'p',
    small: 'small',
    span: 'span',
} as const;

interface TypographyOwnProps
    extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    /** Changes the size of the typography, giving it more or less font size. */
    size?: keyof typeof SizeMap;
    /** Change the visual style of the button. */
    skin?: 'default' | 'primary' | 'secondary' | 'danger';
}

export type TypographyProps<
    T extends React.ElementType = typeof defaultElement
> = PolymorphicPropsWithRef<TypographyOwnProps, T>;

/**
 * This component displays an Typography component.
 * Typography is the used to render headings and paragraphs within an interface.
 *
 * @example
 * ```tsx
 * <Typography as="h1">Heading 1</Typography>
 * ```
 *
 * @param props - TypographyProps
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 */
export const Typography: PolymorphicForwardRefExoticComponent<
    TypographyOwnProps,
    typeof defaultElement
> = forwardRef(
    <T extends React.ElementType = typeof defaultElement>(
        {
            as,
            size,
            skin,
            className,
            children,
            ...otherProps
        }: PolymorphicPropsWithRef<TypographyOwnProps, T>,
        ref: React.ComponentPropsWithRef<T>['ref']
    ): React.ReactElement => {
        const rootClassName = 'typography';
        const objectKeys: <Obj>(o: Obj) => (keyof Obj)[] = Object.keys;

        const defaultSize =
            size ||
            objectKeys(SizeMap).find((key) => SizeMap[key] === as);

        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                defaultSize &&
                    styles[`${rootClassName}--${defaultSize}`],
                skin && styles[`${rootClassName}--${skin}`],
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

Typography.displayName = 'Typography';
