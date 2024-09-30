import React, { useCallback, useRef } from "react";
// Internal Components
import { Day } from "./Day";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Utilities
import { isSameDay, isDateAfter, isDateBefore } from "@stewed/utilities";
// Types
import type { DayOptions, DateOrArrayDates } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

interface Range {
  start: Date | undefined;
  end: Date | undefined;
}

export interface MonthProps<T> {
  days: DayOptions<T>[] | undefined;
  multipleSelect?: boolean;
  siblingMonthDays?: boolean;
  range?: boolean;
  setSelectedDates: React.Dispatch<React.SetStateAction<DateOrArrayDates | undefined>>;
  onDaySelected?: (day: DayOptions<T>) => void;
}

export function Month<T>({
  days,
  siblingMonthDays,
  multipleSelect,
  range,
  setSelectedDates,
  onDaySelected,
}: MonthProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Calendar}__month`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({}),
  };

  const rangeDates = useRef<Range>({
    start: undefined,
    end: undefined,
  });

  const onHandleDayClick = useCallback(
    (day: DayOptions<T>) => {
      const {
        attributes: { selected, disabled },
        date,
      } = day;

      if (disabled) {
        return;
      }

      if (range) {
        if (!rangeDates.current.start) {
          // If no start date exists, set the start to the current date
          rangeDates.current = {
            start: date,
            end: undefined,
          };
          setSelectedDates([date]);
        } else if (rangeDates.current.end && isSameDay(date, rangeDates.current.end)) {
          // If the clicked date is the same as the end, set end to undefined
          rangeDates.current.end = undefined;
          setSelectedDates([rangeDates.current.start]);
        } else if (isSameDay(date, rangeDates.current.start)) {
          // If the clicked date is the same as the start, set start to undefined
          rangeDates.current = {
            start: undefined,
            end: undefined,
          };
          setSelectedDates([]);
        } else if (isDateAfter(date, rangeDates.current.start)) {
          // If the current date is after the start date, set it as the end date
          rangeDates.current.end = date;
          setSelectedDates([[rangeDates.current.start, date]]);
        } else if (isDateBefore(date, rangeDates.current.start)) {
          // If the current date is before the start date, set it as the new start date
          rangeDates.current = {
            start: date,
            end: undefined,
          };
          setSelectedDates([date]);
        }
      } else {
        // If not range mode, handle multiple or single selection
        setSelectedDates((prev) => {
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
    [multipleSelect, onDaySelected, range, setSelectedDates],
  );

  return (
    <div className={cssClasses.root}>
      {days?.map((day, key) => (
        <Day
          key={day.date.getTime()}
          selected={day.attributes.selected}
          today={day.attributes.today}
          weekend={day.attributes.weekend}
          siblingMonthDays={day.attributes.siblingMonthDays}
          disabled={day.attributes.disabled}
          locked={day.attributes.locked}
          startRange={day.attributes.startRange}
          inRange={day.attributes.inRange}
          endRange={day.attributes.endRange}
          onClick={() => onHandleDayClick(day)}>
          {(siblingMonthDays || (!siblingMonthDays && !day.attributes.siblingMonthDays)) && (
            <time dateTime={day.dateFormatted}>{day.dateObject.day}</time>
          )}
        </Day>
      ))}
    </div>
  );
}
