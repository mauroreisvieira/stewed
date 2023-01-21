import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface SectionProps {
    className?: string;
}

export const MenuSection = ({
    className,
    children,
}: React.PropsWithChildren<SectionProps>): React.ReactElement => {
    const rootClassName = 'menu__section';
    const cssClasses = {
        root: classNames(styles[rootClassName], className),
    };

    return (
        <div className={cssClasses.root}>
            {children}
        </div>
    );
};
