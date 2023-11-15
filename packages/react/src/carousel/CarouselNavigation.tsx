import React from 'react';
// UI Components
import { Button } from '../button';
// Utilities
import { classNames } from '@stewed/utils';
// Style
import styles from './Base.module.scss';
import { Icon } from '../icon/Icon';

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
                    <Icon iconName='arrow-left'/>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width={18}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                )
            }
            className={type === 'prev' ? cssClasses.prev : cssClasses.next}
        >
            {type === 'next' ? 'Next Slide' : 'Previous Slide'}
        </Button>
    );
};
