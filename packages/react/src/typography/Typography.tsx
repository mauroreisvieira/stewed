import React, { forwardRef } from 'react';
import {
    classNames,
    PolymorphicPropsWithRef,
    PolymorphicForwardRefExoticComponent,
} from '@stewed/utils';

import styles from './Base.module.scss';

const defaultElement = 'p';

const SizeMap = {
    h1: 'headline-1',
    h2: 'headline-2',
    h3: 'headline-3',
    h4: 'headline-4',
    h5: 'headline-5',
    h6: 'headline-6',
    a: 'link',
    p: 'base',
    small: 'small',
};

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
    TypographyProps,
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
        }: PolymorphicPropsWithRef<TypographyProps, T>,
        ref: React.ComponentPropsWithRef<T>['ref']
    ): React.ReactElement => {
        const rootClassName = 'typography';

        const defaultSize =
            size ||
            (Object.keys(SizeMap).find(
                (key) => key === as
            ) as TypographyOwnProps['size']) ||
            defaultElement;

        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                defaultSize &&
                    styles[`${rootClassName}--${SizeMap[defaultSize]}`],
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
