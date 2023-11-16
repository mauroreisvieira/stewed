import * as React from 'react';
import { classNames } from '@stewed/utilities';

import styles from './Base.module.scss';

export const TabsList = ({
    className,
    children,
    ...otherProps
}: React.HTMLAttributes<HTMLElement>): React.ReactElement => {
    const rootClassName = 'tabs__list';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root} role="tablist" {...otherProps}>
            {children}
        </div>
    );
};
