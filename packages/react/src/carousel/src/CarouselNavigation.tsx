import React from "react";
// UI Components
import { Button } from "../../index";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Style
import styles from "./styles/index.module.scss";

interface CarouselNavigationProps extends React.ComponentProps<"button"> {
  /** The direction of navigation, either 'next' or 'prev'. */
  direction: "next" | "prev";
}

export function CarouselNavigation({
  direction,
  className,
  disabled,
  onClick,
}: CarouselNavigationProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getElement } = useBem({ block: components.Carousel, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    prev: getElement(["prev"], className),
    next: getElement(["next"], className),
  };

  return (
    <Button
      skin="secondary"
      iconOnly
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "next" ? "Next Slide" : "Previous Slide"}
      leftSlot={
        direction === "prev" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={18}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={18}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        )
      }
      className={direction === "prev" ? cssClasses.prev : cssClasses.next}
    />
  );
}
