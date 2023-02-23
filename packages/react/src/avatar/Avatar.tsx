import * as React from 'react';
import { classNames } from '@stewed/utils';
import { AvatarGroup } from './AvatarGroup';
import styles from './Base.module.scss';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Change the visual style of the avatar. */
    skin?: 'primary' | 'secondary';
    /** Changes the size of the avatar. */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hg';
    /** If true, the avatar will be square instead of circular. */
    square?: boolean;
    children?: React.ReactNode;
}

export const Avatar = ({
    size = 'md',
    skin = 'primary',
    square,
    className,
    src,
    children,
    ...otherProps
}: AvatarProps): React.ReactElement => {
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
};
