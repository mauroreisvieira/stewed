import React, {
    useState,
    useEffect,
    useMemo,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from 'react';
// Utils
import { classNames } from '@stewed/utils';
// Sub Components
import { CarouselContext } from './CarouselContext';
import { CarouselIndicator } from './CarouselIndicator';
import { CarouselNavigation } from './CarouselNavigation';
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
                'Number of `slidesPerView` should be bigger then 0'
            );
        }

        const hasLooping = useMemo(
            () => loop && React.Children.count(children) > slidesPerView,
            [children, loop, slidesPerView]
        );

        // number of slides
        const slidesCount = useMemo(
            () => React.Children.count(children),
            [children]
        );

        // will render multiple slides at once
        const isBatch = slidesPerView > 1;

        // slides should occupy the number of slots left
        const numberOfEmptySlots = useMemo(() => {
            if (slidesCount % slidesPerView === 0) return 0;
            return (
                (slidesPerView - (slidesCount % slidesPerView)) % slidesPerView
            );
        }, [slidesPerView, slidesCount]);

        // block user click until finish animation
        const [isProcessing, setProcessing] = useState(false);

        // set current index of slide
        const [currentIndex, setCurrentIndex] = useState<number>(
            isBatch && slidesCount > slidesPerView
                ? slidesPerView + numberOfEmptySlots
                : slidesPerView >= slidesCount
                ? slidesPerView - slidesCount
                : 1
        );

        console.log("currentIndex", currentIndex);

        // check current slide index based on number of slides per view and total of slides
        const currentSlide = useMemo(
            () =>
                Math.max(
                    0,
                    Math.floor((currentIndex - slidesPerView) / slidesPerView)
                ),
            [currentIndex, slidesPerView]
        );

        // set transition enabled for slide change, expect when re-position slide on first or last index
        const [transitionEnabled, setTransitionEnabled] =
            useState<boolean>(true);

        // first touch position to be used in calculation for the swipe speed
        const [touchPosition, setTouchPosition] = useState<null | number>(null);

        const cssClasses = {
            root: classNames(
                styles['carousel'],
                className,
                styles[`${'carousel--center'}`],
                isBatch && styles[`${'carousel'}--batch`]
            ),
            wrapper: classNames(styles[`${'carousel'}__wrapper`]),
            content: classNames(styles[`${'carousel'}__content`]),
            track: classNames(styles[`${'carousel'}__track`]),
            item: classNames(styles[`${'carousel'}__item`]),
            slide: classNames(styles[`${'carousel'}__slide`]),
            bottom: classNames(styles[`${'carousel'}__bottom`]),
        };

        // move backward to the previous item
        const handlePrev = (): void => {
            if (isProcessing) return;

            setProcessing(true);
            setCurrentIndex(
                isBatch ? currentIndex - slidesPerView : currentIndex - 1
            );
        };

        console.log({isBatch});

        // move forward to the next item
        const handleNext = (): void => {
            if (isProcessing) return;

            setProcessing(true);
            setCurrentIndex(
                isBatch ? currentIndex + slidesPerView : currentIndex + 1
            );
        };

        const handleTouchStart = (
            event: React.TouchEvent<HTMLDivElement>
        ): void => {
            setTouchPosition(event.touches[0].clientX);
        };

        const handleTouchMove = (
            event: React.TouchEvent<HTMLDivElement>
        ): void => {
            if (!touchPosition) return;

            const currentTouch = event.touches[0].clientX;
            const diff = touchPosition - currentTouch;

            if (diff > 5) handleNext();
            if (diff < -5) handlePrev();

            setTouchPosition(null);
        };

        const handleTransitionEnd = (): void => {
            setProcessing(false);

            // call onChange callback on 'transitionEnd' to avoid firing during initial render
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
        };

        // render item
        const renderItem = useCallback(
            (child: React.ReactNode | null, key: number): React.ReactNode => (
                <div key={key} className={cssClasses.item}>
                    <div className={cssClasses.slide}>{child}</div>
                </div>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        );

        // render previous items before the first item
        const renderPrevItems = useMemo(
            () =>
                React.Children.toArray(children)
                    .slice(-slidesPerView)
                    .map((child, index) => renderItem(child, index)),
            [children, slidesPerView, renderItem]
        );

        // render next items ter the last item
        const renderNextItems = useMemo(
            () =>
                React.Children.toArray(children)
                    .slice(0, slidesPerView)
                    .map((child, index) => renderItem(child, index)),
            [slidesPerView, children, renderItem]
        );

        // render empty slot when the number of slides divided by the number of slides per view is different from zero
        const renderEmptySlots = useMemo(
            () =>
                Array.from(new Array(numberOfEmptySlots).keys()).map((i) =>
                    renderItem(null, i)
                ),
            [numberOfEmptySlots, renderItem]
        );

        const renderSlides = useMemo(
            (): React.ReactNode =>
                React.Children.map(children, (child, index) =>
                    renderItem(child, index)
                ),
            [children, renderItem]
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

        // exported methods with `ref` to be accessible on the consumer side
        useImperativeHandle(ref, () => ({
            prev: handlePrev,
            next: handleNext,
        }));

        const computedStyles = {
            '--slides': slidesPerView,
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            transition: !transitionEnabled ? 'none' : undefined,
        };

        return (
            <CarouselContext.Provider
                value={{
                    slidesPerView,
                    currentSlide,
                }}
            >
                <div className={cssClasses.root}>
                    <div className={cssClasses.wrapper}>
                        <div
                            className={cssClasses.content}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            {showNavigation && (
                                <CarouselNavigation
                                    type="prev"
                                    onClick={handlePrev}
                                />
                            )}
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
                                <CarouselNavigation
                                    type="next"
                                    onClick={handleNext}
                                />
                            )}
                        </div>
                    </div>
                    {showIndicator && (
                        <CarouselIndicator slidesCount={slidesCount} />
                    )}
                </div>
            </CarouselContext.Provider>
        );
    }
);
