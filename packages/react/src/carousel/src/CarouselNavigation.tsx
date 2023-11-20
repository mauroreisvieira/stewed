import React from 'react';
// UI Components
import { Button } from '../../';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// Utilities
import { classNames } from '@stewed/utilities';
// Style
import styles from './styles/index.module.scss';

interface CarouselNavigationProps {
    type: 'next' | 'prev';
    disabled?: boolean;
    onClick: () => void;
}

export const CarouselNavigation = ({
    type,
    disabled,
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
        <Button
          skin="primary"
          disabled={disabled}
          onClick={handleClick}
          iconOnly
          leftIcon={
                type === 'prev' ? (
                    <FiArrowLeft />
                ) : (
                    <FiArrowRight />
                )
            }
          className={type === 'prev' ? cssClasses.prev : cssClasses.next}
        >
            {type === 'next' ? 'Next Slide' : 'Previous Slide'}
        </Button>
    );
};
