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

/** Represents a range of values, typically used for defining a start and end point. */
interface Range {
  /** The start date of the range. */
  start: Date | undefined;
  /** The end date of the range. */
  end: Date | undefined;
}

/**  Props for the Month component, used to configure the rendering of the month view. */
export interface MonthProps {
  /**  Additional CSS class name for the root element of the month component. */
  className?: string;
}

/**
 * Renders a month view, displaying days and optionally allowing interaction for date selection.
 *
 *
 * @param props - The properties passed to the Month component.
 * @returns The rendered Month component.
 *
 * @see {@link MonthProps} for more details on the available props.
 */
export function Month({ className }: MonthProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({
    block: `${components.Calendar}__month`,
    styles
  });

  const {
    multipleSelect,
    siblingMonthDays,
    readOnly,
    allowRange,
    days,
    setSelectedDates,
    onDaySelected
  } = useCalendarContext();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  const rangeDates = useRef<Range>({
    start: undefined,
    end: undefined
  });

  const onHandleDayClick = useCallback(
    (day: DayOptions<unknown>) => {
      const {
        attributes: { selected, disabled },
        date
      } = day;

      if (readOnly || disabled) {
        return;
      }

      if (allowRange) {
        if (!rangeDates.current.start) {
          // If no start date exists, set the start to the current date
          rangeDates.current = {
            start: date,
            end: undefined
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
            end: undefined
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
            end: undefined
          };
          setSelectedDates?.([date]);
        }
      } else {
        // If not range mode, handle multiple or single selection
        setSelectedDates?.((prev) => {
          if (!prev) return [date];

          if (multipleSelect) {
            if (selected) {
              return prev.filter((val) => !isSameDay(val as Date, date));
            } else {
              return [...prev, date];
            }
          }

          return [date];
        });
      }

      onDaySelected?.(day);
    },
    [multipleSelect, onDaySelected, allowRange, readOnly, setSelectedDates]
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
