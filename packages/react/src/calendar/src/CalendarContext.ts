import React, { use, createContext } from "react";
// Types
import type { DateOrArrayDates, DayOptions, UseCalendarProps } from "@hello-week/hooks";

/**
 * Dummy function to throw an error when calendar is not provided by a CalendarsProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Calendar>" component is wrapping your component.');
};

/**
 * Defines the properties expected in the context for calendar.
 *
 * @template T - The type representing calendar value.
 */
export interface CalendarContextProps<T> extends UseCalendarProps<T> {
  /** Array of strings representing the abbreviated names of the weekdays. */
  weekDays?: string[];
  /** The currently displayed month in a string format (e.g., "January"). */
  month?: string;
  /** The currently displayed year in a string format (e.g., "2024"). */
  year?: string;
  /** Array of day options for the month. This defines the days to be rendered. */
  days?: DayOptions<T>[] | undefined;
  /**
   * If true, the month is rendered in read-only mode and does not allow user interaction.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If true, allows the selection of multiple dates.
   * @default false
   */
  multipleSelect?: boolean;
  /**
   * If true, shows the days of sibling months (previous or next month) in the current view.
   * @default false
   */
  siblingMonthDays?: boolean;
  /**
   * If true, enables date range selection (start and end dates).
   * @default false
   */
  allowRange?: boolean;
  /** Function to set the selected dates, supporting single or multiple date selection. */
  setSelectedDates?: React.Dispatch<React.SetStateAction<DateOrArrayDates | undefined>>;
  /**
   * Callback fired when a day is selected.
   * @param day The day option that was selected.
   */
  onDaySelected?: (day: DayOptions<T>) => void;
  /**
   * Callback function to handle the previous action, such as navigating to the previous month.
   * @returns void
   */
  onPrev: () => void;
  /**
   * Callback function to handle the next action, such as navigating to the next month.
   * @returns void
   */
  onNext: () => void;
}

/**
 * Creates a calendar context with the specified generic type.
 *
 * This function initializes a context for managing Calendar within the application.
 * It provides default values and setters for calendar-related operations.
 *
 * @template T - The type representing Calendar.
 * @returns A new calendar context with the specified generic type.
 */
function createCalendarContext<T>() {
  return createContext<CalendarContextProps<T>>({
    weekDays: undefined,
    month: undefined,
    year: undefined,
    days: undefined,
    weekStart: undefined,
    defaultDate: undefined,
    disabledDates: undefined,
    disabledDaysOfWeek: undefined,
    formatDate: undefined,
    highlightedDates: undefined,
    lang: undefined,
    minDate: undefined,
    maxDate: undefined,
    selectedDates: undefined,
    locked: false,
    disabledPastDates: false,
    highlightedToday: false,
    readOnly: false,
    multipleSelect: false,
    siblingMonthDays: false,
    allowRange: false,
    setSelectedDates: definitionError,
    onDaySelected: definitionError,
    onNext: definitionError,
    onPrev: definitionError
  });
}

/**
 * Default context for managing Calendar.
 *
 * This context provides functionalities to manage Calendar across the application.
 * It includes default values and setters for calendar-related operations.
 */
export const CalendarContext = createCalendarContext();

/**
 * Hook to conveniently use the calendar context.
 *
 * @returns Calendar context values.
 */
export function useCalendarContext<T>() {
  return use(CalendarContext as unknown as React.Context<CalendarContextProps<T>>);
}
