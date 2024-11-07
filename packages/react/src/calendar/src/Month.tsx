import React, { useCallback, useRef } from "react";
// Internal Components
import { Day } from "./Day";
// Hooks
import { useBem } from "@stewed/hooks";
import { useCalendarContext } from "./CalendarContext";
// Tokens
import { components } from "@stewed/tokens";
// Utilities
import { isSameDay, isDateAfter, isDateBefore } from "@hello-week/utilities";
// Types
import type { DayOptions } from "@hello-week/hooks";
// Styles
import styles from "./styles/index.module.scss";

interface Range {
  /** The start date of the range. */
  start: Date | undefined;
  /** The end date of the range. */
  end: Date | undefined;
}

export interface MonthProps {
  /**  Additional CSS class name for the root element of the month component. */
  className?: string;
}

export function Month({ className }: MonthProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Calendar}__month`, styles });

  const {
    multipleSelect,
    siblingMonthDays,
    readOnly,
    allowRange,
    days,
    setSelectedDates,
    onDaySelected,
  } = useCalendarContext();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  const rangeDates = useRef<Range>({
    start: undefined,
    end: undefined,
  });

  const onHandleDayClick = useCallback(
    (day: DayOptions<unknown>) => {
      const {
        attributes: { selected, disabled },
        date,
      } = day;

      if (readOnly || disabled) {
        return;
      }

      if (allowRange) {
        if (!rangeDates.current.start) {
          // If no start date exists, set the start to the current date
          rangeDates.current = {
            start: date,
            end: undefined,
          };
          setSelectedDates?.([date]);
        } else if (rangeDates.current.end && isSameDay(date, rangeDates.current.end)) {
          // If the clicked date is the same as the end, set end to undefined
          rangeDates.current.end = undefined;
          setSelectedDates?.([rangeDates.current.start]);
        } else if (isSameDay(date, rangeDates.current.start)) {
          // If the clicked date is the same as the start, set start to undefined
          rangeDates.current = {
            start: undefined,
            end: undefined,
          };
          setSelectedDates?.([]);
        } else if (isDateAfter(date, rangeDates.current.start)) {
          // If the current date is after the start date, set it as the end date
          rangeDates.current.end = date;
          setSelectedDates?.([[rangeDates.current.start, date]]);
        } else if (isDateBefore(date, rangeDates.current.start)) {
          // If the current date is before the start date, set it as the new start date
          rangeDates.current = {
            start: date,
            end: undefined,
          };
          setSelectedDates?.([date]);
        }
      } else {
        // If not range mode, handle multiple or single selection
        setSelectedDates?.((prev) => {
          if (!prev) return [date];

          return multipleSelect
            ? selected
              ? prev.filter((val) => !isSameDay(val as Date, date))
              : [...prev, date]
            : [date];
        });
      }

      onDaySelected?.(day);
    },
    [multipleSelect, onDaySelected, allowRange, readOnly, setSelectedDates],
  );

  return (
    <div className={cssClasses.root}>
      {days?.map((day) => (
        <Day
          {...day.attributes}
          key={day.date.getTime()}
          aria-label={`${day.dateObject.weekday}, ${day.dateObject.month} ${day.dateObject.day}`}
          onClick={() => onHandleDayClick(day)}
        >
          {(siblingMonthDays || (!siblingMonthDays && !day.attributes.siblingMonthDays)) && (
            <time dateTime={day.dateFormatted}>{day.dateObject.day}</time>
          )}
        </Day>
      ))}
    </div>
  );
}
