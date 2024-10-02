import { useState, useEffect, useCallback, useRef } from "react";
// Calendar
import { Calendar, type CalendarOptions, type DayOptions, type HighlightedDates } from "./Calendar";

export interface UseCalendarProps<T> extends CalendarOptions<T> {}

export interface UseCalendar<T> {
  data:
    | {
        month: string;
        year: string;
        days: DayOptions<T>[];
        weekDays: string[];
        highlightedDates: HighlightedDates<T>[];
      }
    | undefined;
  prevMonth: () => void;
  nextMonth: () => void;
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
  const calendarRef = useRef<Calendar<T>>();
  const [data, setData] = useState<{
    month: string;
    year: string;
    days: DayOptions<T>[];
    weekDays: string[];
    highlightedDates: HighlightedDates<T>[];
  }>();

  const updateCalendar = useCallback(() => {
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

    updateCalendar();
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
    updateCalendar,
    weekStart,
  ]);

  const set = useCallback(
    (ops: UseCalendarProps<T>) => {
      calendarRef.current?.setOptions((prev) => ({
        ...prev,
        ...ops,
      }));

      updateCalendar();
    },
    [updateCalendar],
  );

  const prevMonth = useCallback(() => {
    calendarRef.current?.prevMonth();
    updateCalendar();
  }, [updateCalendar]);

  const nextMonth = useCallback(() => {
    calendarRef.current?.nextMonth();
    updateCalendar();
  }, [updateCalendar]);

  return {
    data,
    prevMonth,
    nextMonth,
    set,
  };
}
