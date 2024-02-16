import React from "react";
// UI Components
import { Button } from "../../index";
// Utilities
import { classNames } from "@stewed/utilities";
// Style
import styles from "./styles/index.module.scss";

interface CarouselNavigationProps {
  direction: "next" | "prev";
  disabled?: boolean;
  onClick: () => void;
}

export function CarouselNavigation({
  direction,
  disabled,
  onClick,
}: CarouselNavigationProps): React.ReactElement {
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
      appearance="ghost"
      disabled={disabled}
      onClick={handleClick}
      iconOnly
      leftSlot={
        direction === "prev" ? (
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
      className={direction === "prev" ? cssClasses.prev : cssClasses.next}
    >
      {direction === "next" ? "Next Slide" : "Previous Slide"}
    </Button>
  );
}
