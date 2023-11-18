import React from 'react';
// Utilities
import { classNames } from '@stewed/utilities';
// Styles
import styles from './styles/index.module.scss';

export function AvatarGroup({
    className,
    children,
    ...otherProps
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
    const rootClassName = 'avatar-group';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root} {...otherProps}>
            {children}
        </div>
    );
}
