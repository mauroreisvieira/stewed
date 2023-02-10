import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    ratio?: '1:1' | '2:3' | '3:2' |  '4:3' | '16:9';
}

export const AspectRatio = ({
    ratio = '1:1',
    className,
    children,
    ...otherProps
}: AspectRatioProps): React.ReactElement => {
    const rootClassName = 'aspect-ratio';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${ratio.replace(":", "-")}`],
            className
        ),
    };

    return <div className={cssClasses.root} {...otherProps}>{children}</div>;
};
