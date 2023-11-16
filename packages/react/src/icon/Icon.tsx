// React
import React, { forwardRef } from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// SVG sources
import { icons } from './assets';
// Styles
import styles from './Base.module.scss';

type Name = keyof typeof icons;
type Size = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface IconProps extends React.SVGAttributes<SVGAElement> {
    iconName: Name;
    size?: Size;
    skin?: 'text' | 'natural';
}

export const Icon = forwardRef(
    (
        {
            iconName,
            size = 'm',
            skin = 'text',
            className,
            ...nativeProps
        }: IconProps,
        ref: React.Ref<SVGAElement>
    ) => {
        const cssClasses = classNames(
            styles['icon'],
            styles[`$icon--${size}`],
            styles[`$icon--text`] && skin === 'text',
            className
        );

        const computedProps = {
            ref,
            ...nativeProps,
        };

        const IconComponent = icons[iconName];

        return (
            <IconComponent
              aria-label={iconName}
              className={cssClasses}
              {...computedProps}
            />
        );
    }
);
