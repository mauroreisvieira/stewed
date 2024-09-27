import { useState, useEffect, useCallback, useRef } from "react";
// Calendar
import {
  HelloWeek,
  type HelloWeekProps,
  type DayOptions,
  type HighlightedDates,
} from "./HelloWeek";

export interface UseCalendarProps<T> extends HelloWeekProps<T> {}

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
}: UseCalendarProps<T>) {
  const calendarRef = useRef<HelloWeek<T>>();
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
    calendarRef.current = new HelloWeek<T>({
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
        formatDate: {
          ...ops?.formatDate,
          day: ops?.formatDate?.day || "2-digit",
          month: ops?.formatDate?.month || "2-digit",
          year: ops?.formatDate?.year || "numeric",
          weekday: ops?.formatDate?.weekday || "narrow",
        },
      }));

      updateCalendar();
    },
    [updateCalendar],
  );

  const onPrevMonth = useCallback(() => {
    calendarRef.current?.prevMonth();
    updateCalendar();
  }, [updateCalendar]);

  const onNextMonth = useCallback(() => {
    calendarRef.current?.nextMonth();
    updateCalendar();
  }, [updateCalendar]);

  return {
    data,
    onPrevMonth,
    onNextMonth,
    set,
  };
}
