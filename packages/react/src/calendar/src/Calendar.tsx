import React, { useCallback, useEffect, useMemo } from "react";
// Compound Component
import { Navigation } from "./Navigation";
import { Week } from "./Week";
import { Month, type MonthProps } from "./Month";
// Hooks
import { useBem, useCalendar, type UseCalendarProps } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface CalendarProps<T> extends UseCalendarProps<T> {
  /** Additional class name for the calendar container.  */
  className?: string;
  /**  Whether the calendar should render in right-to-left (RTL) mode. */
  rtl?: boolean;
  /**  Callback fired when the month changes. */
  onMonthChange?: (props: { month: string | undefined; year: string | undefined }) => void;
}

/**
 * Calendar component that supports multiple selection, date ranges, and custom date formatting.
 * It is fully customizable, allowing control over navigation, week display, and month rendering.
 *
 *
 * @template T The type of the data for each date.
 *
 * @param {CalendarProps<T>} props The properties for the calendar.
 * @returns {React.ReactElement} The rendered calendar component.
 *
 * @example
 * ```tsx
 * const [selectedDates, setSelectedDates] = useState<DateOrArrayDates>([]);
 *
 * <Calendar
 *   className="custom-calendar"
 *   selectedDates={selectedDates}
 *   setSelectedDates={setSelectedDates}
 *   onMonthChange={() => console.log("Month changed")}
 * >
 *   <Calendar.Navigation>
 *     {({ onPrev, onNext, month, year }) => (
 *       <>
 *         <Button onClick={onPrev}>Prev</Button>
 *         <Button>{month} {year}</Button>
 *         <Button onClick={onNext}>Next</Button>
 *       </>
 *     )}
 *   </Calendar.Navigation>
 *   <Calendar.Week />
 *   <Calendar.Month />
 * </Calendar>
 * ```
 */
export function Calendar<T>({
  className,
  multipleSelect = false,
  allowRange = false,
  rtl,
  siblingMonthDays = false,
  selectedDates,
  setSelectedDates,
  defaultDate: initialDate,
  disabledDates,
  disabledDaysOfWeek,
  disabledPastDates,
  formatDate,
  highlightedDates,
  highlightedToday,
  lang,
  locked,
  readOnly,
  maxDate,
  minDate,
  weekStart,
  onMonthChange,
  onDaySelected,
}: CalendarProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Calendar, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [rtl && "rtl", locked && "locked", allowRange && "range"],
      extraClasses: className,
    }),
    week: getElement(["week"]),
    month: getElement(["month"]),
  };

  const defaultDate = useMemo(
    () => (initialDate instanceof Date ? initialDate : new Date()),
    [initialDate],
  );

  const { data, prevMonth, nextMonth } = useCalendar({
    selectedDates,
    defaultDate,
    disabledDates,
    disabledDaysOfWeek,
    disabledPastDates,
    formatDate,
    highlightedDates,
    highlightedToday,
    lang,
    locked,
    maxDate,
    minDate,
    weekStart,
  });

  useEffect(() => {
    onMonthChange?.({ month: data?.month, year: data?.year });
  }, [onMonthChange, data?.month, data?.year]);

  const onHandlePrevMonth = useCallback(() => {
    if (locked) {
      return;
    }
    prevMonth();
  }, [locked, prevMonth]);

  const onHandleNextMonth = useCallback(() => {
    if (locked) {
      return;
    }
    nextMonth?.();
  }, [locked, nextMonth]);

  return (
    <div className={cssClasses.root}>
      <Navigation
        onPrev={onHandlePrevMonth}
        onNext={onHandleNextMonth}
        locked={locked}
        currentMonth={data?.month}
        currentYear={data?.year}
      />

      <Week weekDays={data?.weekDays} />

      <Month
        readOnly={readOnly}
        days={data?.days}
        multipleSelect={multipleSelect}
        allowRange={allowRange}
        siblingMonthDays={siblingMonthDays}
        setSelectedDates={setSelectedDates}
        onDaySelected={onDaySelected}
      />
    </div>
  );
}

Calendar.Navigation = Navigation;
Calendar.Week = Week;
Calendar.Week = Month;
