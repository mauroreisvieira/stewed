import React, { useMemo } from 'react';
// Utilities
import { classNames } from '@stewed/utils';
// Style
import styles from './Base.module.scss';

interface CarouselIndicatorProps {
    slidesPerView: number;
    currentSlide: number;
    slidesCount: number;
}

export const CarouselIndicator = ({
    slidesPerView,
    currentSlide,
    slidesCount,
}: CarouselIndicatorProps): React.ReactElement => {
    const cssClasses = {
        root: classNames(styles['carousel__indicator']),
        dot: classNames(styles['carousel_dot']),
    };

    const numberOfSlides = useMemo(
        () => Array.from({ length: slidesCount / slidesPerView }),
        []
    );

    return (
        <div className={cssClasses.root}>
            {numberOfSlides.map((_, k) => (
                <div
                    key={`carousel__dot-${k}`}
                    className={classNames(
                        cssClasses.dot,
                        currentSlide === k && styles['is-active']
                    )}
                />
            ))}
        </div>
    );
};
