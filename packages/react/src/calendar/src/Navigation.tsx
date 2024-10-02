import React from "react";
// UI Components
import { Button, Tooltip } from "../../";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface NavigationProps {
  /** Callback function to navigate to the previous month. */
  onPrev: () => void;
  /** Callback function to navigate to the next month. */
  onNext: () => void;
  /**
   * Optional label for the previous month button.
   * If not provided, a default label will be used.
   */
  prevMonthLabel?: string;
  /**
   * Optional label for the next month button.
   * If not provided, a default label will be used.
   */
  nextMonthLabel?: string;
  /**
   * Indicates whether the navigation is locked.
   * If true, navigation to previous or next months is disabled.
   */
  locked: boolean | undefined;
  /** The currently displayed month in a string format (e.g., "January"). */
  currentMonth: string | undefined;
  /** The currently displayed year in a string format (e.g., "2024"). */
  currentYear: string | undefined;
}

export function Navigation({
  onPrev,
  onNext,
  prevMonthLabel = "Prev month",
  nextMonthLabel = "Next month",
  currentMonth,
  currentYear,
  locked,
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
      <Tooltip<HTMLButtonElement>
        renderAnchor={(props) => (
          <Button
            {...props}
            skin="neutral"
            appearance="ghost"
            size="sm"
            iconOnly
            className={cssClasses.prev}
            aria-label={prevMonthLabel}
            disabled={locked}
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
            }
          />
        )}
        placement="right"
        delay={3000}>
        {prevMonthLabel}
      </Tooltip>

      <div className={cssClasses.period}>
        {currentYear} {currentMonth}
      </div>

      <Tooltip<HTMLButtonElement>
        renderAnchor={(props) => (
          <Button
            {...props}
            skin="neutral"
            appearance="ghost"
            size="sm"
            iconOnly
            className={cssClasses.next}
            onClick={onNext}
            aria-label={nextMonthLabel}
            disabled={locked}
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
            }
          />
        )}
        placement="left"
        delay={3000}>
        {nextMonthLabel}
      </Tooltip>
    </div>
  );
}
