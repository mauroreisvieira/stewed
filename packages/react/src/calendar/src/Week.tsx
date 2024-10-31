import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
import { useCalendarContext } from "./CalendarContext";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface WeekProps {
  /**  Additional CSS class name for the root element of the week component. */
  className?: string;
}

export function Week({ className }: WeekProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Calendar}__week`, styles });

  const { weekDays } = useCalendarContext();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    day: getElement(["day"]),
  };

  return (
    <div className={cssClasses.root}>
      {weekDays?.map((week, index) => (
        <div key={`week-${index}`} className={cssClasses.day}>
          {week}
        </div>
      ))}
    </div>
  );
}
