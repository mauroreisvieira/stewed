import React from 'react';
import { useCarouselContext } from './CarouselContext';
// Utils
import { classNames } from '@stewed/utils';
// Style
import styles from './Base.module.scss';

interface CarouselIndicatorProps {
    slidesCount: number;
}

export const CarouselIndicator = ({
    slidesCount,
}: CarouselIndicatorProps): React.ReactElement => {
    const { currentSlide, slidesPerView } = useCarouselContext();
    const cssClasses = {
        root: classNames(styles['carousel__indicator']),
    };


    return (
        <div className={cssClasses.root}>
            {Array.from({ length: slidesCount / slidesPerView }).map((_, k) => (
                <div key={`carousel__dot-${k}`} className={classNames(styles['carousel__dot'], currentSlide === k && styles['is-active'])} />
            ))}
        </div>
    );
};
