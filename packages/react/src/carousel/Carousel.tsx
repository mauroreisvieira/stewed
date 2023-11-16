import React, {
    useState,
    useEffect,
    useMemo,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from 'react';
// Sub Components
import { CarouselIndicator } from './CarouselIndicator';
import { CarouselNavigation } from './CarouselNavigation';
// Utilities
import { classNames } from '@stewed/utilities';
// Style
import styles from './Base.module.scss';

export interface CarouselProps {
    /** Enables infinite looping */
    loop?: boolean;
    /** Will show/hide prev and next button */
    showNavigation?: boolean;
    /** Define position for arrow buttons */
    navigationPosition?: 'center' | 'bottom-right';
    /** Will show/hide indicator */
    showIndicator?: boolean;
    /** Number of slides to display */
    slidesPerView?: number;
    /** Callback when slides change */
    onChange?: (slide: number) => void;
    className?: string;
    children?: React.ReactNode;
}

export interface CarouselRef {
    /** Change current slide to next slide */
    next: () => void;
    /** Change current slide to previous slide */
    prev: () => void;
}

/**
 * This component displays an Carousel component.
 *
 * Carousel displays its children as carousel items which can be scrolled.
 *
 * @example
 * ```tsx
 * <Carousel loop={true}>
 *   <div />
 *   <div />
 *   <div />
 * </Carousel>
 * ```
 *
 * @param props - CarouselProps
 * @remarks This component supports all other HTMLAttributes props
 */
// ... (import statements remain unchanged)

export const Carousel = forwardRef(
    (
        {
            loop = false,
            showNavigation = true,
            showIndicator = true,
            slidesPerView = 1,
            className,
            children,
            onChange,
        }: CarouselProps,
        ref: React.Ref<CarouselRef>
    ): React.ReactElement => {
        if (slidesPerView < 1) {
            throw new Error(
                'Number of `slidesPerView` should be greater than 0'
            );
        }

        const hasLooping = useMemo(
            () => loop && React.Children.count(children) > slidesPerView,
            [children, loop, slidesPerView]
        );
        const slidesCount = useMemo(
            () => React.Children.count(children),
            [children]
        );
        const numberOfEmptySlots = useMemo(() => {
            if (slidesCount % slidesPerView === 0) return 0;
            return (
                (slidesPerView - (slidesCount % slidesPerView)) % slidesPerView
            );
        }, [slidesPerView, slidesCount]);

        const isBatch = slidesPerView > 1;

        // number of slides will be render on indicators
        const numberOfIndicators = Math.ceil(slidesCount / slidesPerView);

        const cssClasses = {
            root: classNames(
                styles['carousel'],
                isBatch && styles['carousel--batch'],
                className
            ),
            wrapper: classNames(styles['carousel__wrapper']),
            content: classNames(styles['carousel__content']),
            track: classNames(styles['carousel__track']),
            item: classNames(styles['carousel__item']),
            slide: classNames(styles['carousel__slide']),
            bottom: classNames(styles['carousel__bottom']),
        };

        const [isProcessing, setProcessing] = useState(false);

        const [currentIndex, setCurrentIndex] = useState<number>(() => {
            if (isBatch && slidesCount > slidesPerView) {
                return slidesPerView + numberOfEmptySlots;
            }

            if (slidesPerView >= slidesCount) {
                return slidesPerView - slidesCount + 1;
            }

            return 1;
        });

        const [transitionEnabled, setTransitionEnabled] =
            useState<boolean>(true);
        const [touchPosition, setTouchPosition] = useState<null | number>(null);

        const currentSlide = useMemo(
            () =>
                Math.max(
                    0,
                    Math.floor((currentIndex - slidesPerView) / slidesPerView)
                ),
            [currentIndex, slidesPerView]
        );

        const handlePrev = useCallback(() => {
            if (isProcessing) return;
            setProcessing(true);
            setCurrentIndex(
                isBatch ? currentIndex - slidesPerView : currentIndex - 1
            );
        }, [isProcessing, isBatch, currentIndex, slidesPerView]);

        const handleNext = useCallback(() => {
            if (isProcessing) return;
            setProcessing(true);
            setCurrentIndex(
                isBatch ? currentIndex + slidesPerView : currentIndex + 1
            );
        }, [isProcessing, isBatch, currentIndex, slidesPerView]);

        const handleTouchStart = useCallback(
            (event: React.TouchEvent<HTMLDivElement>) => {
                setTouchPosition(event.touches[0].clientX);
            },
            []
        );

        const handleTouchMove = useCallback(
            (event: React.TouchEvent<HTMLDivElement>) => {
                if (!touchPosition) return;
                const currentTouch = event.touches[0].clientX;
                const diff = touchPosition - currentTouch;
                if (diff > 5) handleNext();
                if (diff < -5) handlePrev();
                setTouchPosition(null);
            },
            [touchPosition, handleNext, handlePrev]
        );

        const handleTransitionEnd = useCallback(() => {
            setProcessing(false);
            if (onChange) onChange(currentSlide);
            if (!hasLooping) return;

            if (currentIndex === numberOfEmptySlots) {
                setTransitionEnabled(false);
                setCurrentIndex(
                    isBatch ? slidesCount + numberOfEmptySlots * 2 : slidesCount
                );
                return;
            }

            if (
                currentIndex - numberOfEmptySlots ===
                slidesCount + numberOfEmptySlots + slidesPerView
            ) {
                setTransitionEnabled(false);
                setCurrentIndex(slidesPerView + numberOfEmptySlots);
                return;
            }
        }, [
            currentIndex,
            currentSlide,
            hasLooping,
            onChange,
            numberOfEmptySlots,
            isBatch,
            slidesCount,
            slidesPerView,
        ]);

        const renderSlide = useCallback(
            (child: React.ReactNode, key: number) => (
                <div key={key} className={cssClasses.item}>
                    <div className={cssClasses.slide}>{child}</div>
                </div>
            ),
            [cssClasses.item, cssClasses.slide]
        );

        const renderPrevItems = useMemo(
            () =>
                React.Children.toArray(children)
                    .slice(-slidesPerView)
                    .map((child, index) => renderSlide(child, index)),
            [children, slidesPerView, renderSlide]
        );

        const renderNextItems = useMemo(
            () =>
                React.Children.toArray(children)
                    .slice(0, slidesPerView)
                    .map((child, index) => renderSlide(child, index)),
            [children, slidesPerView, renderSlide]
        );

        const renderEmptySlots = useMemo(
            () =>
                Array.from({ length: numberOfEmptySlots }, (_, i) =>
                    renderSlide(null, i)
                ),
            [numberOfEmptySlots, renderSlide]
        );

        const renderSlides = useMemo(
            () =>
                React.Children.map(children, (child, index) =>
                    renderSlide(child, index)
                ),
            [children, renderSlide]
        );

        useEffect(() => {
            if (!hasLooping) return;
            if (
                currentIndex === slidesPerView + numberOfEmptySlots ||
                currentIndex - numberOfEmptySlots ===
                    slidesCount + numberOfEmptySlots
            ) {
                setTransitionEnabled(true);
            }
        }, [
            currentIndex,
            hasLooping,
            slidesPerView,
            slidesCount,
            numberOfEmptySlots,
        ]);

        useImperativeHandle(
            ref,
            () => ({
                prev: handlePrev,
                next: handleNext,
            }),
            [handlePrev, handleNext]
        );

        const computedStyles = {
            '--slides': slidesPerView,
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            transition: !transitionEnabled ? 'none' : undefined,
        };

        return (
            <div className={cssClasses.root}>
                <div className={cssClasses.wrapper}>
                    <div
                      className={cssClasses.content}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                    >
                        <div
                          className={cssClasses.track}
                          style={computedStyles}
                          onTransitionEnd={handleTransitionEnd}
                        >
                            {slidesCount > slidesPerView && renderPrevItems}
                            {numberOfEmptySlots > 0 && renderEmptySlots}
                            {renderSlides}
                            {numberOfEmptySlots > 0 && renderEmptySlots}
                            {slidesCount > slidesPerView && renderNextItems}
                        </div>
                        {showNavigation && (
                            <>
                                <CarouselNavigation
                                  disabled={
                                        slidesCount <= slidesPerView ||
                                        (!hasLooping && currentSlide === 0)
                                    }
                                  type="prev"
                                  onClick={handlePrev}
                                />
                                <CarouselNavigation
                                  disabled={
                                        slidesCount <= slidesPerView ||
                                        (!hasLooping &&
                                            currentSlide ===
                                                numberOfIndicators - 1)
                                    }
                                  type="next"
                                  onClick={handleNext}
                                />
                            </>
                        )}
                    </div>
                </div>
                {showIndicator && (
                    <CarouselIndicator
                      currentSlide={currentSlide}
                      slidesPerView={slidesPerView}
                      slidesCount={slidesCount}
                    />
                )}
            </div>
        );
    }
);
