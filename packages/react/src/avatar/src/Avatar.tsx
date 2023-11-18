import React from 'react';
// Compound Component
import { AvatarGroup } from './AvatarGroup';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Change the visual style of the avatar. */
    skin?: 'primary' | 'secondary';
    /** Changes the size of the avatar. */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** If true, the avatar will be square instead of circular. */
    square?: boolean;
}

export function Avatar({
    size = 'md',
    skin = 'primary',
    square,
    className,
    src,
    children,
    ...otherProps
}: AvatarProps): React.ReactElement {
    const rootClassName = 'avatar';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            square && styles[`${rootClassName}--square`],
            styles[`${rootClassName}--${size}`],
            styles[`${rootClassName}--${skin}`],
            className
        ),
    };

    return (
        <div className={cssClasses.root}>
            {src ? (
                <img
                    src={src}
                    alt={children?.toString() || otherProps.alt}
                    {...otherProps}
                />
            ) : children && typeof children === 'string' ? (
                children.match(/[A-Z]/g)?.join('').slice(0, 2).toUpperCase()
            ) : (
                children
            )}
        </div>
    );
}

// Compound component composition
Avatar.Group = AvatarGroup;
