import React, { useCallback, useMemo } from "react";
// Internal Components
import { Navigation, type NavigationProps } from "./Navigation";
import { Week } from "./Week";
import { Month, type MonthProps } from "./Month";
// Hooks
import { useBem, useCalendar, type UseCalendarProps } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface CalendarProps<T>
  extends UseCalendarProps<T>,
    Omit<MonthProps<T>, "days">,
    Pick<NavigationProps, "prevMonthLabel" | "nextMonthLabel"> {
  /** Additional class name for the calendar container.  */
  className?: string;
  /**  Whether the calendar should render in right-to-left (RTL) mode. */
  rtl?: boolean;
  /**  Callback fired when the month changes. */
  onMonthChange?: () => void;
}

/**
 * Calendar component that supports multiple selection, date ranges, and custom date formatting.
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
 * />
 * ```
 */
export function Calendar<T>({
  className,
  multipleSelect = false,
  range = false,
  rtl,
  siblingMonthDays = false,
  selectedDates,
  setSelectedDates,
  defaultDate,
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
    root: getBlock({ modifiers: [rtl && "rtl", locked && "locked"], extraClasses: className }),
    week: getElement(["week"]),
    month: getElement(["month"]),
  };

  const today = useMemo(() => new Date(), []);

  const { data, onPrevMonth, onNextMonth } = useCalendar({
    selectedDates,
    defaultDate: defaultDate || today,
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

  const onHandlePrevMonth = useCallback(() => {
    if (locked) {
      return;
    }
    onPrevMonth();
    onMonthChange?.();
  }, [locked, onMonthChange, onPrevMonth]);

  const onHandleNextMonth = useCallback(() => {
    if (locked) {
      return;
    }
    onNextMonth?.();
    onMonthChange?.();
  }, [locked, onMonthChange, onNextMonth]);

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
        range={range}
        siblingMonthDays={siblingMonthDays}
        setSelectedDates={setSelectedDates}
        onDaySelected={onDaySelected}
      />
    </div>
  );
}
