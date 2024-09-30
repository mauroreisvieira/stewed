import React from "react";
// UI Components
import { Button } from "../../button";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentMonth: string | undefined;
  currentYear: string | undefined;
}

export function Navigation({
  onPrev,
  onNext,
  currentMonth,
  currentYear,
}: NavigationProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Calendar}__navigation`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({}),
    period: getElement(["period"]),
    prev: getElement(["prev"]),
    next: getElement(["next"]),
  };

  return (
    <div className={cssClasses.root}>
      <Button
        skin="neutral"
        appearance="ghost"
        iconOnly
        className={cssClasses.prev}
        onClick={onPrev}
        leftSlot={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        }>
        Prev Month
      </Button>

      <div className={cssClasses.period}>
        <Button skin="neutral" appearance="ghost" fullWidth>
          {currentYear} {currentMonth}
        </Button>
      </div>

      <Button
        skin="neutral"
        appearance="ghost"
        iconOnly
        className={cssClasses.next}
        onClick={onNext}
        leftSlot={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        }>
        Next Month
      </Button>
    </div>
  );
}
