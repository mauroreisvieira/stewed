import React, { useRef, useCallback, useState } from "react";
// UI Components
import { Button } from "../../index";
// Components
import { Navigation } from "./Navigation";
import { Month } from "./Month";
import { Day } from "./Day";
import { Week } from "./Week";
import { WeekDay } from "./WeekDay";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Calendar
import {
  useCalendar,
  type UseCalendarProps,
  type DayOptions,
  type DateOrArrayDates,
} from "@stewed/hooks";
import { isSameDay, isDateBefore, isDateAfter } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export type Range = {
  start: Date | undefined;
  end: Date | undefined;
};

interface CalendarProps<T> extends UseCalendarProps<T> {
  className?: string;
  appearance?: "fullscreen" | "compact";
  multipleSelect?: boolean;
  range?: boolean;
  onNavigate?: () => void;
  onDayClick?: (day: DayOptions<T>) => void;
  renderDay?: (day: DayOptions<T>) => React.ReactElement | undefined;
}

export function Calendar<T>({
  selectedDates: initialDates,
  appearance = "fullscreen",
  multipleSelect = false,
  range = false,
  onNavigate,
  onDayClick,
  className,
  renderDay,
  ...props
}: CalendarProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Calendar, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [],
      extraClasses: className,
    }),
    week: getElement(["week"]),
    period: getElement(["period"]),
    navigation: getElement(["navigation"]),
    prev: getElement(["prev"]),
    next: getElement(["next"]),
    month: getElement(["month"]),
    day: getElement(["day"]),
  };

  const [selectedDates, setSelectedDates] = useState<DateOrArrayDates | undefined>(initialDates);

  const rangeDates = useRef<Range>({
    start: undefined,
    end: undefined,
  });

  const { data, onPrevMonth, onNextMonth } = useCalendar({ selectedDates, ...props });

  const onHandlePrevMonth = useCallback(() => {
    onPrevMonth();
    onNavigate?.();
  }, [onNavigate, onPrevMonth]);

  const onHandleNextMonth = useCallback(() => {
    onNextMonth?.();
    onNavigate?.();
  }, [onNavigate, onNextMonth]);

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

      onDayClick?.(day);
    },
    [multipleSelect, onDayClick, range],
  );

  return (
    <div className={cssClasses.root}>
      <Navigation
        className={cssClasses.navigation}
        prevSlot={
          <Button
            skin="neutral"
            appearance="ghost"
            iconOnly
            className={cssClasses.prev}
            onClick={onHandlePrevMonth}
            leftSlot={
              <svg
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            }>
            Prev Month
          </Button>
        }
        nextSlot={
          <Button
            skin="neutral"
            appearance="ghost"
            iconOnly
            className={cssClasses.next}
            onClick={onHandleNextMonth}
            leftSlot={
              <svg
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            }>
            Next Month
          </Button>
        }>
        <div className={cssClasses.period}>
          <Button skin="neutral" appearance="ghost" fullWidth>
            {data?.month} {data?.year}
          </Button>
        </div>
      </Navigation>
      <Week className={cssClasses.week}>
        {data?.weekDays?.map((week, index) => (
          <WeekDay key={`${week}-${index}`} className={cssClasses.day}>
            {week}
          </WeekDay>
        ))}
      </Week>
      <Month className={cssClasses.month}>
        {data?.days?.map((day, key) => (
          <div key={key} className={cssClasses.day}>
              <Day
                dayOfMonth={day.date.getDate()}
                dayOfWeek={day.date.getDay()}
                disabled={day.attributes.disabled}
                highlighted={day.attributes.highlighted}
                locked={day.attributes.locked}
                inRange={day.attributes.inRange}
                startRange={day.attributes.startRange}
                endRange={day.attributes.endRange}
                selected={day.attributes.selected}
                today={day.attributes.today}
                weekend={day.attributes.weekend}
                onClick={() => onHandleDayClick(day)}>
                <time dateTime={day.dateFormatted}>{day.dateObject.day}</time>
              </Day>
              {renderDay && <span>{renderDay(day)}</span>}
          </div>
        ))}
      </Month>
    </div>
  );
}
