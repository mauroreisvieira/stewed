import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  useCallback,
} from "react";
// Sub Components
import { CarouselNavigation } from "./CarouselNavigation";
import { CarouselSlide } from "./CarouselSlide";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Style
import styles from "./styles/index.module.scss";

export interface CarouselProps
  extends React.ComponentPropsWithRef<"div">,
    UseResponsiveProps<{
      /**
       * Touch drag enabled.
       * @default true
       */
      touched: boolean;
      /**
       * Enables infinite looping
       * @default true
       */
      loop?: boolean;
      /**
       * Will show/hide prev and next button
       * @default true
       */
      showNavigation?: boolean;
      /**
       * Number of slides to display
       * @default 1
       */
      perView?: number;
    }> {
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
 * Carousel displays its children as carousel items which can be scrolled.
 *
 * @example
 * ```tsx
 * <Carousel touched={false} loop={false}>
 *   <div />
 *   <div />
 *   <div />
 * </Carousel>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {CarouselProps} props - The props for the Carousel component.
 * @returns {React.ReactElement} - The rendered Carousel component.
 */
export const Carousel = forwardRef(
  (
    {
      touched = true,
      loop = true,
      showNavigation = true,
      perView,
      className,
      children,
      onSlideChange,
      responsive,
      ...props
    }: CarouselProps,
    ref: React.Ref<CarouselRef>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Carousel, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        extraClasses: className,
      }),
      wrapper: getElement(["wrapper"]),
      content: getElement(["content"]),
      track: getElement(["track"]),
      item: getElement(["item"]),
      slide: getElement(["slide"]),
      bottom: getElement(["bottom"]),
    };

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        perView,
        touched,
        loop,
        showNavigation,
        responsive,
      },
      activeToken.screens
    );

    // Total Slides
    const slidesCount = useMemo(() => React.Children.count(children), [children]);

    // Number of slider per view
    const show = computedProps.perView || 1;

    // The carousel repeating it's item
    const loopingEffect = useMemo(
      () => computedProps.loop && slidesCount > show,
      [computedProps.loop, show, slidesCount],
    );

    // Current Index Item of the Carousel
    const [currentIndex, setCurrentIndex] = useState<number>(loopingEffect ? show : 0);

    // block user click until finish animation
    const [isProcessing, setProcessing] = useState(false);

    // Is the carousel's transition enabled
    const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);

    // First touch position to be used in calculation for the swipe speed
    const [touchPosition, setTouchPosition] = useState<null | number>(null);

    /**
     * Handle if the carousel is repeating
     * and the currentIndex have been set to the last or first item
     */
    useEffect(() => {
      if (!loopingEffect) return;

      if (currentIndex === show || currentIndex === slidesCount) {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      }
    }, [currentIndex, loopingEffect, show, slidesCount]);

    /**
     * Move backward to the previous item
     */
    const onHandlePrev = useCallback(() => {
      if (loopingEffect || currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - show);
      }
      setProcessing(true);
    }, [currentIndex, loopingEffect, show]);

    /**
     * Move forward to the next item
     */
    const onHandleNext = useCallback(() => {
      if (isProcessing) return;
      if (loopingEffect || currentIndex < slidesCount - show) {
        setCurrentIndex((prevState) => prevState + show);
      }
      setProcessing(true);
    }, [currentIndex, isProcessing, loopingEffect, show, slidesCount]);

    /**
     * Handle when the user start the swipe gesture
     * @param event - TouchEvent
     */
    const onHandleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
      if (!event.touches[0] || !computedProps.touched) return;

      // Save the first position of the touch
      const touchDown = event.touches[0].clientX;
      setTouchPosition(touchDown);
    };

    /**
     * Handles touch move events for swipe gestures.
     * @param event - TouchEvent
     */
    const onHandleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
      // Proceed only if the initial position is not null and there is a touch event
      if (!touchPosition || !event.touches[0]) return;

      // Get the current touch position
      const currentTouch: number = event.touches[0].clientX;

      // Calculate the difference between the previous and current touch positions
      const diff: number = touchPosition - currentTouch;

      // If the difference is positive and greater than 5 pixels, navigate to the next item
      if (diff > 5) {
        onHandleNext();
      }

      // If the difference is negative and greater than 5 pixels, navigate to the previous item
      if (diff < -5) {
        onHandlePrev();
      }

      // Reset the initial touch position after handling the swipe
      setTouchPosition(null);
    };

    /**
     * Handles the end of carousel transitions
     */
    const onHandleTransitionEnd = () => {
      requestAnimationFrame(() => {
        // Set processing to false after the transition
        setProcessing(false);
      });

      // Handle transition to the last slide if looping effect is enabled and the current index is 0
      if (loopingEffect && currentIndex === 0) {
        setCurrentIndex(slidesCount);
        setTransitionEnabled(false);
        if (onSlideChange) onSlideChange(slidesCount);
        return;
      }

      // Handle transition to the first slide if looping effect is enabled and the current index is slidesCount + 1
      if (loopingEffect && currentIndex === slidesCount + show) {
        setCurrentIndex(1);
        setTransitionEnabled(false);
        if (onSlideChange) onSlideChange(1);
        return;
      }

      // Invoke slide change callback with the current index
      if (onSlideChange) onSlideChange(currentIndex);
    };

    // Render additional slides preceding the first item
    const renderExtraPreviousSlides = useMemo(() => {
      return React.Children.toArray(children)
        .slice(-1) // Get the last item
        .map((child, index) => <CarouselSlide key={index}>{child}</CarouselSlide>);
    }, [children]);

    // Render additional slides following the last item
    const renderExtraNextSlides = useMemo(() => {
      return React.Children.toArray(children)
        .slice(0, 1) // Get the first item
        .map((child, index) => <CarouselSlide key={index}>{child}</CarouselSlide>);
    }, [children]);

    // Render slides
    const renderSlides = useMemo(
      () =>
        React.Children.map(children, (child, index) => (
          <CarouselSlide key={index}>{child}</CarouselSlide>
        )),
      [children],
    );

    useImperativeHandle(
      ref,
      () => ({
        prev: onHandlePrev,
        next: onHandleNext,
      }),
      [onHandlePrev, onHandleNext],
    );

    const computedStyles = {
      "--carousel-slides": show,
      "transform": `translateX(-${currentIndex * (100 / show)}%)`,
      "transition": !transitionEnabled ? "none" : undefined,
    };

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
              {slidesCount > show && loopingEffect && renderExtraPreviousSlides}
              {renderSlides}
              {slidesCount > show && loopingEffect && renderExtraNextSlides}
            </div>
            {computedProps.showNavigation && (
              <>
                <CarouselNavigation
                  direction="prev"
                  onClick={onHandlePrev}
                  disabled={!loopingEffect && currentIndex === 0}
                />
                <CarouselNavigation
                  direction="next"
                  onClick={onHandleNext}
                  disabled={!loopingEffect && currentIndex === slidesCount - show}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);
