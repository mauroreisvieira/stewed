import { useState, useEffect, useCallback, useRef } from "react";
// Calendar
import { Calendar, type CalendarOptions, type DayOptions, type HighlightedDates } from "./Calendar";

/** Props for configuring the `useCalendar` hook, extending the base `CalendarOptions`. */
export interface UseCalendarProps<T> extends CalendarOptions<T> {}

interface UseCalendarData<T> {
  /** The current month being displayed. */
  month: string;
  /** The current year being displayed. */
  year: string;
  /** The array of day objects for the current month. */
  days: DayOptions<T>[];
  /** The array of weekday names for display. */
  weekDays: string[];
  /** An array of highlighted dates. */
  highlightedDates: HighlightedDates<T>[];
}

export interface UseCalendar<T> {
  /**
   * Calendar data including the month, year, days, weekdays, and highlighted dates.
   * Can be `undefined` if the data has not been initialized yet.
   */
  data?: UseCalendarData<T> | undefined;
  /** Navigates to the previous month. */
  prevMonth: () => void;
  /**  Navigates to the next month. */
  nextMonth: () => void;
  /**
   * Sets the calendar options.
   * @param options - The options to configure the calendar.
   */
  set: (options: UseCalendarProps<T>) => void;
}

export function useCalendar<T>({
  defaultDate,
  disabledDates,
  disabledDaysOfWeek,
  disabledPastDates,
  formatDate,
  highlightedDates,
  highlightedToday,
  lang,
  maxDate,
  minDate,
  selectedDates,
  weekStart,
  locked,
}: UseCalendarProps<T>): UseCalendar<T> {
  // A ref to store the `Calendar` instance, which provides the calendar logic and methods.
  const calendarRef = useRef<Calendar<T>>();

  // State to hold the calendar data such as the month, year, days, weekdays, and highlighted dates.
  // Initially undefined until the data is fetched or initialized.
  const [data, setData] = useState<UseCalendarData<T>>();

  const updateData = useCallback(() => {
    const calendar = calendarRef.current;

    if (!calendar) {
      return;
    }

    setData({
      month: calendar.getMonth({ format: "long" }),
      year: calendar.getYear(),
      days: calendar.getDays(),
      weekDays: calendar.getWeekDays(),
      highlightedDates: calendar.getDaysHighlight(),
    });
  }, []);

  useEffect(() => {
    calendarRef.current = new Calendar<T>({
      defaultDate,
      disabledDates,
      disabledDaysOfWeek,
      disabledPastDates,
      formatDate,
      highlightedDates,
      highlightedToday,
      lang,
      maxDate,
      minDate,
      selectedDates,
      weekStart,
      locked,
    });

    updateData();

    () => setData(undefined);
  }, [
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
    selectedDates,
    updateData,
    weekStart,
  ]);

  const set = useCallback(
    (ops: UseCalendarProps<T>) => {
      calendarRef.current?.setOptions((prev) => ({
        ...prev,
        ...ops,
      }));

      updateData();
    },
    [updateData],
  );

  const prevMonth = useCallback(() => {
    calendarRef.current?.prevMonth();
    updateData();
  }, [updateData]);

  const nextMonth = useCallback(() => {
    calendarRef.current?.nextMonth();
    updateData();
  }, [updateData]);

  return {
    data,
    prevMonth,
    nextMonth,
    set,
  };
}
