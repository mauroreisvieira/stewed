import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface DayProps {
  disabled?: boolean;
  locked?: boolean;
  inRange?: boolean;
  siblingMonthDays?: boolean;
  startRange?: boolean;
  endRange?: boolean;
  selected?: boolean;
  today?: boolean;
  weekend?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Day({
  today,
  selected,
  disabled,
  locked,
  weekend,
  siblingMonthDays,
  startRange,
  inRange,
  endRange,
  children,
  onClick,
}: DayProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Calendar}__day`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        today && "today",
        selected && "selected",
        disabled && "disabled",
        locked && "locked",
        weekend && "weekend",
        siblingMonthDays && "sibling-month-day",
        startRange && "start-range",
        inRange && "in-range",
        endRange && "end-range",
      ],
    }),
  };

  return (
    <button
      role="checkbox"
      tabIndex={-1}
      aria-checked={selected}
      className={cssClasses.root}
      aria-disabled={disabled || locked}
      disabled={siblingMonthDays || disabled || locked}
      data-weekend={weekend}
      onClick={onClick}>
      {children}
    </button>
  );
}
