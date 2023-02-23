import * as React from 'react';
import { classNames } from '@stewed/utils';
import { AvatarGroup } from './AvatarGroup';
import styles from './Base.module.scss';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Change the visual style of the avatar. */
    skin?: 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hg';
    children?: React.ReactNode;
}

export const Avatar = ({
    size = 'md',
    skin = 'primary',
    className,
    children,
    ...otherProps
}: AvatarProps): React.ReactElement => {
    const rootClassName = 'avatar';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${size}`],
            styles[`${rootClassName}--${skin}`],
            className
        ),
    };

    return (
        <div className={cssClasses.root}>
            {children && typeof children === 'string'
                ? children
                      .match(/[A-Z]/g)
                      ?.join('')
                      .slice(0, 2)
                      .toUpperCase()
                : children}

            {!children && otherProps.src && <img {...otherProps} />}
        </div>
    );
};

Avatar.Group = AvatarGroup;
