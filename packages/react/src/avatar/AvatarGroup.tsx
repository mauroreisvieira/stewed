import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export const AvatarGroup = ({
    className,
    children,
    ...otherProps
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => {
    const rootClassName = 'avatar-group';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            className
        ),
    };

    return (
        <div className={cssClasses.root} {...otherProps}>
            {children}
        </div>
    );
};
