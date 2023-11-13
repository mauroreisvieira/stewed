import React from 'react';
import { classNames } from '@stewed/utils';
// Style
import styles from './Base.module.scss';

interface CarouselNavigationProps {
    type: 'next' | 'prev';
    onClick: () => void;
}

export const CarouselNavigation = ({
    type,
    onClick,
}: CarouselNavigationProps): React.ReactElement => {
    const cssClasses = {
        prev: classNames(styles[`carousel__prev`]),
        next: classNames(styles[`carousel__next`]),
    };

    const handleClick = (): void => {
        if (onClick) onClick();
    };

    return (
        <button
            aria-label={type === 'next' ? 'Next' : 'Previous'}
            onClick={handleClick}
            className={type === 'prev' ? cssClasses.prev : cssClasses.next}
        >
            {type === 'prev' ? 'Prev' : 'Next'}
        </button>
    );
};
