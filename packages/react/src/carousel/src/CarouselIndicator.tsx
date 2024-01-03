import React, { useMemo } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Style
import styles from "./styles/index.module.scss";

interface CarouselIndicatorProps {
  /** The number of slides to be displayed per view. */
  slidesPerView: number;
  /** The index of the current slide. */
  currentSlide: number;
  /** The total count of slides in the carousel. */
  slidesCount: number;
  /**
   * Function called when an indicator is clicked.
   * @param {number} index - The index of the clicked indicator.
   */
  onClick: (index: number) => void;
}

export const CarouselIndicator = ({
  slidesPerView,
  currentSlide,
  slidesCount,
  onClick,
}: CarouselIndicatorProps): React.ReactElement => {
  const cssClasses = {
    root: classNames(styles["carousel__indicator"]),
    dot: classNames(styles["carousel__dot"]),
  };

  const numberOfSlides = useMemo(
    () => Array.from({ length: slidesCount / slidesPerView }),
    [slidesCount, slidesPerView],
  );

  return (
    <div className={cssClasses.root}>
      {numberOfSlides.map((_, k) => (
        <div
          key={`carousel__dot-${k}`}
          className={classNames(cssClasses.dot, currentSlide === k && styles["is-active"])}
          onClick={(): void => onClick(k + 1)}
        />
      ))}
    </div>
  );
};
