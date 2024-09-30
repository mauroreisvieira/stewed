import React, { useCallback, useMemo, useState } from "react";
// Internal Components
import { Navigation } from "./Navigation";
import { Week } from "./Week";
import { Month, type MonthProps } from "./Month";
// Hooks
import { useBem, useCalendar, type UseCalendarProps, type DateOrArrayDates } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface CalendarProps<T>
  extends UseCalendarProps<T>,
    Omit<MonthProps<T>, "setSelectedDates" | "days"> {
  className?: string;
  rtl?: boolean;
  onMonthChange?: () => void;
}

export function Calendar<T>({
  className,
  multipleSelect = false,
  range = false,
  rtl,
  siblingMonthDays = false,
  onMonthChange,
  onDaySelected,
  selectedDates: initialDates,
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
}: CalendarProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Calendar, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [rtl && "rtl"], extraClasses: className }),
    week: getElement(["week"]),
    month: getElement(["month"]),
  };

  const [selectedDates, setSelectedDates] = useState<DateOrArrayDates | undefined>(initialDates);

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

  console.log("selectedDates",selectedDates);

  const onHandlePrevMonth = useCallback(() => {
    onPrevMonth();
    onMonthChange?.();
  }, [onMonthChange, onPrevMonth]);

  const onHandleNextMonth = useCallback(() => {
    onNextMonth?.();
    onMonthChange?.();
  }, [onMonthChange, onNextMonth]);

  return (
    <div className={cssClasses.root}>
      <Navigation
        onPrev={onHandlePrevMonth}
        onNext={onHandleNextMonth}
        currentMonth={data?.month}
        currentYear={data?.year}
      />

      <Week weekDays={data?.weekDays} />

      <Month
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
