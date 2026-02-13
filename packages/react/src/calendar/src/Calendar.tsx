import React, { useCallback, useEffect, useMemo } from "react";
// Context
import { CalendarContext, type CalendarContextProps } from "./CalendarContext";
// Compound Component
import { Navigation } from "./Navigation";
import { Week } from "./Week";
import { Month } from "./Month";
// Hooks
import { useBem } from "@stewed/hooks";
import { useCalendar, type DayOptions } from "@hello-week/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for handling month and year changes.
 * Used for components that manage or display month and year information.
 */
interface MonthChangeProps {
  /**
   * The selected month, represented as a string (e.g., "January", "February").
   * May be undefined if no month is selected.
   */
  month: string | undefined;
  /**
   * The selected year, represented as a string (e.g., "2024").
   * May be undefined if no year is selected.
   */
  year: string | undefined;
}

/**
 * Props for the Calendar component.
 * Provides configuration options for rendering and interacting with the calendar.
 *
 * @template T - The type of data to be used for each date (e.g., event, note, etc.).
 */
export interface CalendarProps<T>
  extends Omit<
    CalendarContextProps<T>,
    "weekDays" | "month" | "year" | "days" | "onPrev" | "onNext"
  > {
  /** Additional class name for the calendar container.  */
  className?: string;
  /**  Whether the calendar should render in right-to-left (RTL) mode. */
  rtl?: boolean;
  /**
   * Callback fired when the month changes, is called whenever the calendar's month or year is updated, allowing
   * the parent component to respond to changes in the calendar view.
   *
   * @see {@link MonthChangeProps} for more details on the available props.
   *
   * @param props - An object containing
   */
  onMonthChange?: (props: MonthChangeProps) => void;
  /** Slot for children components.  */
  children?: React.ReactNode;
}

/**
 * Calendar component that supports multiple selection, date ranges, and custom date formatting.
 * It is fully customizable, allowing control over navigation, week display, and month rendering.
 *
 * @template T The type of the data for each date.
 *
 * @param props - The properties for the calendar.
 * @returns The rendered calendar component.
 *
 * @see {@link CalendarProps} for the complete list of props.
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
  children
}: CalendarProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({
    block: components.Calendar,
    styles
  });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [rtl && "rtl", locked && "locked", allowRange && "range"],
      extraClasses: className
    }),
    week: getElement(["week"]),
    month: getElement(["month"])
  };

  // Create a default date using useMemo to avoid unnecessary recalculations.
  // If the initialDate is a valid Date instance, use it, otherwise, default to the current date.
  const defaultDate = useMemo(
    () => (initialDate instanceof Date ? initialDate : new Date()),
    [initialDate]
  );

  // Call the useCalendar hook to get calendar data and navigation functions.
  // The hook takes various parameters such as selected dates, default date, disabled dates, etc.
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
    weekStart
  });

  // Effect to handle month change callback.
  // Whenever the month or year in the calendar data changes, call onMonthChange with the new month and year.
  useEffect(() => {
    onMonthChange?.({ month: data?.month, year: data?.year });
  }, [onMonthChange, data?.month, data?.year]);

  // Callback to handle navigating to the previous month.
  // If the navigation is locked, do nothing; otherwise, call the prevMonth function.
  const onHandlePrevMonth = useCallback(() => {
    // Prevent navigation if locked.
    if (locked) {
      return;
    }
    // Navigate to the previous month.
    prevMonth();
  }, [locked, prevMonth]);

  // Callback to handle navigating to the next month.
  // Similar logic to onHandlePrevMonth, respecting the locked state.
  const onHandleNextMonth = useCallback(() => {
    // Prevent navigation if locked.
    if (locked) {
      return;
    }
    // Navigate to the next month if available.
    nextMonth?.();
  }, [locked, nextMonth]);

  return (
    <div className={cssClasses.root}>
      <CalendarContext
        value={{
          locked,
          readOnly,
          multipleSelect,
          allowRange,
          siblingMonthDays,
          setSelectedDates,
          onDaySelected: onDaySelected as (day: DayOptions<unknown>) => void,
          month: data?.month,
          year: data?.year,
          weekDays: data?.weekDays,
          days: data?.days,
          onPrev: onHandlePrevMonth,
          onNext: onHandleNextMonth
        }}
      >
        {children}
      </CalendarContext>
    </div>
  );
}

// Compound component composition
Calendar.Navigation = Navigation;
Calendar.Week = Week;
Calendar.Month = Month;
