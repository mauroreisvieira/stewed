import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
// Sub Components
import { CarouselNavigation } from "./CarouselNavigation";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Style
import styles from "./styles/index.module.scss";

export interface CarouselProps extends React.ComponentPropsWithRef<"div"> {
  /** The gap between box items. Can be a predefined size or a custom value. */
  gap?: Spacings;
  /** Enables infinite looping */
  loop?: boolean;
  /** Will show/hide prev and next button */
  showNavigation?: boolean;
  /** Number of slides to display */
  slidesPerView?: number;
  /** Callback when slides change */
  onSlideChange?: (slide: number) => void;
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
      gap,
      loop = false,
      showNavigation = true,
      slidesPerView = 1,
      className,
      children,
      onSlideChange,
      ...props
    }: CarouselProps,
    ref: React.Ref<CarouselRef>,
  ): React.ReactElement => {
    if (slidesPerView < 1) {
      throw new Error("Number of `slidesPerView` should be greater than 0");
    }

    // will render multiple slides at once
    const isBatch = slidesPerView > 1;

    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Carousel, styles });

    const cssClasses = {
      root: getBlock({ modifiers: [gap && isBatch && `gap-${gap}`], extraClasses: className }),
      wrapper: getElement(["wrapper"]),
      content: getElement(["content"]),
      track: getElement(["track"]),
      item: getElement(["item"]),
      slide: getElement(["slide"]),
      bottom: getElement(["bottom"]),
    };

    // number of slides
    const slidesCount = useMemo(() => React.Children.count(children), [children]);

    const loopingEffect = useMemo(
      () => loop && slidesCount > slidesPerView,
      [slidesCount, loop, slidesPerView],
    );

    // slides should occupy the number of slots left
    const numberOfEmptySlots = useMemo(() => {
      if (slidesCount % slidesPerView === 0) return 0;
      return (slidesPerView - (slidesCount % slidesPerView)) % slidesPerView;
    }, [slidesPerView, slidesCount]);

    // number of slides will be render on indicators
    const numberOfIndicators = Math.ceil(slidesCount / slidesPerView);

    // block user click until finish animation
    const [isProcessing, setProcessing] = useState(false);

    // set current index of slide
    const [currentIndex, setCurrentIndex] = useState<number>(
      isBatch && slidesCount > slidesPerView
        ? slidesPerView + numberOfEmptySlots
        : slidesPerView >= slidesCount
          ? slidesPerView - slidesCount
          : 1,
    );

    // set transition enabled for slide change, expect when re-position slide on first or last index
    const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);

    // first touch position to be used in calculation for the swipe speed
    const [touchPosition, setTouchPosition] = useState<null | number>(null);

    // check current slide index based on number of slides per view and total of slides
    const currentSlide = useMemo(
      () => Math.max(0, Math.floor((currentIndex - slidesPerView) / slidesPerView)),
      [currentIndex, slidesPerView],
    );

    const onHandlePrev = useCallback(() => {
      if (isProcessing) return;
      setProcessing(true);
      setCurrentIndex(isBatch ? currentIndex - slidesPerView : currentIndex - 1);
    }, [isProcessing, isBatch, currentIndex, slidesPerView]);

    const onHandleNext = useCallback(() => {
      if (isProcessing) return;
      setProcessing(true);
      setCurrentIndex(isBatch ? currentIndex + slidesPerView : currentIndex + 1);
    }, [isProcessing, isBatch, currentIndex, slidesPerView]);

    const onHandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchPosition(event.touches[0].clientX);
    };

    const onHandleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
      if (!touchPosition) return;
      const currentTouch = event.touches[0].clientX;
      const diff = touchPosition - currentTouch;
      if (diff > 5) onHandleNext();
      if (diff < -5) onHandlePrev();
      setTouchPosition(null);
    };

    const onHandleTransitionEnd = () => {
      setProcessing(false);
      if (onSlideChange) onSlideChange(currentSlide);
      if (!loopingEffect) return;

      if (currentIndex === numberOfEmptySlots) {
        setTransitionEnabled(false);
        setCurrentIndex(isBatch ? slidesCount + numberOfEmptySlots * 2 : slidesCount);
        return;
      }

      if (currentIndex - numberOfEmptySlots === slidesCount + numberOfEmptySlots + slidesPerView) {
        setTransitionEnabled(false);
        setCurrentIndex(slidesPerView + numberOfEmptySlots);
        return;
      }
    };

    const renderSlide = useCallback(
      (child: React.ReactNode, key: number) => (
        <div key={key} className={cssClasses.item}>
          <div className={cssClasses.slide}>{child}</div>
        </div>
      ),
      [cssClasses.item, cssClasses.slide],
    );

    const renderPrevItems = useMemo(
      () =>
        React.Children.toArray(children)
          .slice(-slidesPerView)
          .map((child, index) => renderSlide(child, index)),
      [children, slidesPerView, renderSlide],
    );

    const renderNextItems = useMemo(
      () =>
        React.Children.toArray(children)
          .slice(0, slidesPerView)
          .map((child, index) => renderSlide(child, index)),
      [children, slidesPerView, renderSlide],
    );

    const renderEmptySlots = useMemo(
      () => Array.from({ length: numberOfEmptySlots }, (_, i) => renderSlide(null, i)),
      [numberOfEmptySlots, renderSlide],
    );

    const renderSlides = useMemo(
      () => React.Children.map(children, (child, index) => renderSlide(child, index)),
      [children, renderSlide],
    );

    useEffect(() => {
      if (!loopingEffect) return;
      if (
        currentIndex === slidesPerView + numberOfEmptySlots ||
        currentIndex - numberOfEmptySlots === slidesCount + numberOfEmptySlots
      ) {
        setTransitionEnabled(true);
      }
    }, [currentIndex, loopingEffect, slidesPerView, slidesCount, numberOfEmptySlots]);

    useImperativeHandle(
      ref,
      () => ({
        prev: onHandlePrev,
        next: onHandleNext,
      }),
      [onHandlePrev, onHandleNext],
    );

    console.log("currentIndex", currentIndex);

    const computedStyles = {
      "--slides": slidesPerView,
      "transform": `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
      "transition": !transitionEnabled ? "none" : undefined,
    };

    console.log("hasLooping", loopingEffect);

    return (
      <div className={cssClasses.root} {...props}>
        <div className={cssClasses.wrapper}>
          <div
            className={cssClasses.content}
            onTouchStart={onHandleTouchStart}
            onTouchMove={onHandleTouchMove}
          >
            <div
              className={cssClasses.track}
              style={computedStyles}
              onTransitionEnd={onHandleTransitionEnd}
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
                  disabled={slidesCount <= slidesPerView || (!loopingEffect && currentSlide === 0)}
                  direction="prev"
                  onClick={onHandlePrev}
                />
                <CarouselNavigation
                  disabled={
                    slidesCount <= slidesPerView ||
                    (!loopingEffect && currentSlide === numberOfIndicators - 1)
                  }
                  direction="next"
                  onClick={onHandleNext}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);
