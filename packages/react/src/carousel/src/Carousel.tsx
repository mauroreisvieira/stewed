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
import { components, type Spacings } from "@stewed/tokens";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Style
import styles from "./styles/index.module.scss";

interface NavigationButtonProps {
  /** The class name to be applied to the navigation button for styling purposes. */
  className: string;
  /** Whether the navigation button is disabled. If true, the button will be non-interactive and typically styled as disabled. */
  disabled: boolean;
  /** Function to handle the click event for the navigation button. */
  onClick: () => void;
}

export interface CarouselProps
  extends React.ComponentPropsWithRef<"div">,
    UseResponsiveProps<{
      /**
       * The gap between box children's.
       * @default md
       */
      gap?: Spacings;
      /**
       * Touch drag enabled.
       * @default true
       */
      touched?: boolean;
      /**
       * Enables infinite looping
       * @default true
       */
      loop?: boolean;
      /**
       * Controls the visibility of the previous and next navigation buttons.
       * @default true
       */
      showNavigation?: boolean;
      /** An object that allows custom rendering of the previous and next navigation buttons. */
      navigation?: {
        /**
         * A callback function for rendering the previous button.
         * @param props - The properties for rendering, including `onClick` and `disabled`.
         */
        renderPrev: (props: NavigationButtonProps) => React.ReactNode;
        /**
         * A callback function for rendering the next button.
         * @param props - The properties for rendering, including `onClick` and `disabled`.
         */
        renderNext: (props: NavigationButtonProps) => React.ReactNode;
      };
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
  /** Change current slide to specific index */
  goTo: (index: number) => void;
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
      gap = "md",
      loop = true,
      showNavigation = true,
      perView,
      className,
      children,
      onSlideChange,
      responsive,
      navigation,
      ...props
    }: CarouselProps,
    ref: React.Ref<CarouselRef>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Carousel, styles });

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        gap,
        perView,
        touched,
        loop,
        showNavigation,
        responsive,
        navigation,
      },
      activeToken.breakpoints,
    );

    // Number of slider per view
    const show = computedProps.perView || 1;

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [show > 1 && computedProps.gap && `gap-${computedProps.gap}`],
        extraClasses: className,
      }),
      wrapper: getElement(["wrapper"]),
      content: getElement(["content"]),
      track: getElement(["track"]),
      item: getElement(["item"]),
      slide: getElement(["slide"]),
      bottom: getElement(["bottom"]),
      prev: getElement(["prev"], className),
      next: getElement(["next"], className),
    };

    // Total Slides
    const slidesCount = useMemo(() => React.Children.count(children), [children]);

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

    /** Move to specific item */
    const moveTo = useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    /** Move backward to the previous item */
    const moveBackward = useCallback(() => {
      if (loopingEffect || currentIndex > 0) {
        moveTo(currentIndex - show);
      }
    }, [currentIndex, loopingEffect, moveTo, show]);

    /** Move forward to the next item */
    const moveForward = useCallback(() => {
      if (loopingEffect || currentIndex < slidesCount - show) {
        moveTo(currentIndex + show);
      }
    }, [currentIndex, loopingEffect, moveTo, show, slidesCount]);

    /**
     * Handles the click event for moving backward.
     * If the process is ongoing, it returns early, otherwise move backward and sets the processing state.
     */
    const onHandleClickPrev: () => void = useCallback(() => {
      if (isProcessing) return;
      moveBackward();
      setProcessing(true);
    }, [isProcessing, moveBackward]);

    /**
     * Handles the click event for moving forward.
     * If the process is ongoing, it returns early, otherwise move forward and sets the processing state.
     */
    const onHandleClickNext: () => void = useCallback(() => {
      if (isProcessing) return;
      moveForward();
      setProcessing(true);
    }, [isProcessing, moveForward]);

    /**
     * Handles the start of a swipe gesture by the user.
     *
     * @param {React.TouchEvent<HTMLDivElement>} event - The touch event object.
     */
    const onHandleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
      if (!event.touches[0] || !computedProps.touched) return;
      // Save the first position of the touch
      const touchDown = event.touches[0].clientX;
      setTouchPosition(touchDown);
    };

    /**
     * Handles touch move events for swipe gestures.
     *
     * @param {React.TouchEvent<HTMLDivElement>} event - The touch event object.
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
        moveForward();
      }

      // If the difference is negative and greater than 5 pixels, navigate to the previous item
      if (diff < -5) {
        moveBackward();
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

    const isPrevDisabled = !loopingEffect && currentIndex === 0;
    const isNextDisabled = !loopingEffect && currentIndex === slidesCount - show;

    const computedStyles = {
      "--carousel-slides": show,
      "transform": `translateX(-${currentIndex * (100 / show)}%)`,
      "transition": !transitionEnabled ? "none" : undefined,
    };

    useImperativeHandle(
      ref,
      () => ({
        prev: onHandleClickPrev,
        next: onHandleClickNext,
        goTo: moveTo,
      }),
      [onHandleClickPrev, onHandleClickNext, moveTo],
    );

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
          </div>
          {computedProps.showNavigation && (
            <>
              {/** Prev button */}
              {computedProps.navigation?.renderPrev ? (
                computedProps.navigation.renderPrev({
                  className: cssClasses.prev,
                  onClick: onHandleClickPrev,
                  disabled: isPrevDisabled,
                })
              ) : (
                <CarouselNavigation
                  direction="prev"
                  className={cssClasses.prev}
                  onClick={onHandleClickPrev}
                  disabled={isPrevDisabled}
                />
              )}

              {/** Next button */}
              {computedProps.navigation?.renderNext ? (
                computedProps.navigation.renderNext({
                  className: cssClasses.next,
                  onClick: onHandleClickNext,
                  disabled: isNextDisabled,
                })
              ) : (
                <CarouselNavigation
                  direction="next"
                  className={cssClasses.next}
                  onClick={onHandleClickNext}
                  disabled={isNextDisabled}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);
