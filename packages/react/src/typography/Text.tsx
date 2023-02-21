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
    base: defaultElement,
} as const;

type TextVariation =
    | 'italic'
    | 'normal'
    | 'uppercase'
    | 'lowercase'
    | 'capitalize';

interface TextOwnProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    /** Changes the size of the text, giving it more or less font size. */
    size?:
        | 'xs'
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '2xl'
        | '3xl'
        | '4xl'
        | '5xl'
        | '6xl'
        | '7xl'
        | '8xl';
    /** Changes the weight of the text, giving it more or less weight. */
    weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    /** Changes the font styles and transforming text. */
    variation?: TextVariation | TextVariation[];
    /** Change the visual style of the text. */
    skin?: 'default' | 'primary' | 'secondary' | 'danger';
}

export type TextProps<T extends React.ElementType = typeof defaultElement> =
    PolymorphicPropsWithRef<TextOwnProps, T>;

/**
 * This component displays an Text component.
 * Text is the used to render headings and paragraphs within an interface.
 *
 * @example
 * ```tsx
 * <Text as="h1">Heading 1</Text>
 * ```
 *
 * @param props - TextProps
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 */
export const Text: PolymorphicForwardRefExoticComponent<
    TextOwnProps,
    typeof defaultElement
> = forwardRef(
    <T extends React.ElementType = typeof defaultElement>(
        {
            as,
            size,
            weight,
            skin,
            variation,
            className,
            children,
            ...otherProps
        }: PolymorphicPropsWithRef<TextOwnProps, T>,
        ref: React.ComponentPropsWithRef<T>['ref']
    ): React.ReactElement => {
        const rootClassName = 'typography';
        const objectKeys: <Obj>(o: Obj) => (keyof Obj)[] = Object.keys;
        const computedVariation = Array.isArray(variation)
            ? variation
            : [variation];

        const computedSize = objectKeys(SizeMap).find(
            (key) => SizeMap[key] === (as || defaultElement)
        );

        const cssClasses = {
            root: classNames(
                styles[rootClassName],
                computedSize && styles[`${rootClassName}--${computedSize}`],
                skin && styles[`${rootClassName}--${skin}`],
                size && styles[`${rootClassName}--${size}`],
                weight && styles[`${rootClassName}--${weight}`],
                ...computedVariation.map(
                    (i) => styles[`${rootClassName}--${i}`]
                ),
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

Text.displayName = 'Text';
