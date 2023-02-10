import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    gap?: 'xs' | "sm" | "md" | "lg" | "xl" | "hg";
    justify?: 'start' | "end" | "center" | "between" | "around" | "evenly";
    items?: 'start' | "end" | "center" | "baseline" | "stretch";
    wrap?: 'wrap' | "wrap-reverse" | "nowrap";
    inline?: boolean;
    grow?: boolean;
}

export const Flex = ({
    direction = 'row',
    gap,
    justify,
    items,
    wrap,
    inline,
    grow,
    className,
    children,
    ...otherProps
}: FlexProps): React.ReactElement => {
    const rootClassName = 'flex';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${direction}`],
            gap && styles[`${rootClassName}--gap-${gap}`],
            justify && styles[`${rootClassName}--justify-${justify}`],
            items && styles[`${rootClassName}--items-${items}`],
            wrap && styles[`${rootClassName}--${wrap}`],
            inline && styles[`${rootClassName}--inline`],
            grow && styles[`${rootClassName}--grow`],
            className
        ),
    };

    return <div className={cssClasses.root} {...otherProps}>{children}</div>;
};
