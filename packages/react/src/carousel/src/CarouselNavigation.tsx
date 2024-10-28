import React from "react";
// UI Components
import { Button, Icon } from "../../index";

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
      leftSlot={direction === "prev" ? <Icon.ChevronLeft /> : <Icon.ChevronRight />}
    />
  );
}
