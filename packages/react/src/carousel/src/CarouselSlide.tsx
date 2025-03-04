import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Style
import styles from "./styles/index.module.scss";

/** Props for the CarouselSlide component. */
interface CarouselSlideProps {
  /**
   * The content to be rendered within the slide.
   * This can be any valid React node, such as text, images, or other components.
   */
  children: React.ReactNode;
}

/**
 * CarouselSlide component that represents a single slide in the carousel.
 *
 * @param props - The props for the CarouselSlide component.
 * @returns A React element representing the slide.
 */
export function CarouselSlide({ children }: CarouselSlideProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getElement } = useBem({ block: components.Carousel, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    item: getElement(["item"]),
    slide: getElement(["slide"])
  };

  return (
    <div className={cssClasses.item}>
      <div className={cssClasses.slide}>{children}</div>
    </div>
  );
}
