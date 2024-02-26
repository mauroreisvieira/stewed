import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Style
import styles from "./styles/index.module.scss";

interface CarouselSlideProps {
  /** The content to be rendered within the slide. */
  children: React.ReactNode;
}

export function CarouselSlide({ children }: CarouselSlideProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getElement } = useBem({ block: components.Carousel, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    item: getElement(["item"]),
    slide: getElement(["slide"]),
  };

  return (
    <div className={cssClasses.item}>
      <div className={cssClasses.slide}>{children}</div>
    </div>
  );
}
