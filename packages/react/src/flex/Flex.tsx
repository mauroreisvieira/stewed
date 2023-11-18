import React from 'react';
import { classNames } from '@stewed/utilities';

import styles from './Base.module.scss';

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    gap?: Sizes;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
    space?: {
        x?: Sizes;
        y?: Sizes;
    };
    inline?: boolean;
    grow?: boolean;
}

export const Flex = ({
    direction = 'row',
    gap,
    justify,
    items,
    wrap,
    space,
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
            space?.x && styles[`${rootClassName}--space-x-${space.x}`],
            space?.y && styles[`${rootClassName}--space-y-${space.y}`],
            wrap && styles[`${rootClassName}--${wrap}`],
            inline && styles[`${rootClassName}--inline`],
            grow && styles[`${rootClassName}--grow`],
            className
        ),
    };

    return (
        <div className={cssClasses.root} {...otherProps}>
            {children}
        </div>
    );
};
