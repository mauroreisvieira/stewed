import React from "react";
// UI Components
import { Button } from "../../index";

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
  return (
    <Button
      skin="neutral"
      appearance="ghost"
      iconOnly
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "next" ? "Next Slide" : "Previous Slide"}
      className={className}
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
    />
  );
}
