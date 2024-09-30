import {
  isToday,
  isDateAfter,
  isDateBefore,
  isSameDay,
  isDateInRange,
  isArray,
} from "@stewed/utilities";

export const DAYS_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

export type Weekdays = typeof DAYS_WEEK;

// Represents the numeric values of days of the week.
export type WeekdaysValues = Weekdays[keyof Weekdays];

export const WEEKDAYS: WeekdaysValues[] = [0, 1, 2, 3, 4, 5, 6];

// Represents either a single Date object or a range of two Date objects.
export type DateOrArrayDates = (Date | [Date, Date])[];

export interface HighlightedDates<T> {
  // Explicitly typed 'days' property for individual dates or date ranges.
  days: DateOrArrayDates;
  // Other properties can be of type T.
  data: T;
}

// Represents the configuration options for the calendar.
export interface HelloWeekProps<T> {
  // The default date to display on the calendar.
  defaultDate: Date;
  // The language/locale to use for date formatting.
  lang?: Intl.LocalesArgument;
  // The date format options for formatting dates.
  formatDate?: Intl.DateTimeFormatOptions;
  // The numeric value corresponding to the start day of the week (0 for Sunday, 1 for Monday, etc.).
  weekStart?: WeekdaysValues;
  // An array of selected dates for the calendar.
  selectedDates?: DateOrArrayDates;
  // An array of dates to highlight on the calendar.
  highlightedDates?: HighlightedDates<T>[];
  // An array of disabled dates on the calendar.
  disabledDates?: DateOrArrayDates;
  // Indicates if past dates are disabled on the calendar.
  disabledPastDates?: boolean;
  // An array of numeric values corresponding to days of the week to be disabled on the calendar.
  disabledDaysOfWeek?: WeekdaysValues[];
  // The minimum selectable date on the calendar.
  minDate?: Date;
  // The maximum selectable date on the calendar.
  maxDate?: Date;
  // Indicates if the calendar is locked and cannot be interacted with.
  locked?: boolean;
  // Indicates if today's date should be highlighted on the calendar.
  highlightedToday?: boolean;
}

// Represents the options for each day in the calendar.
export type DayOptions<T> = {
  // The date object representing the day.
  date: Date;
  // The formatted string representation of the day's date.
  dateFormatted: string;
  // The date object containing individual parts of the day's date.
  dateObject: {
    day: string;
    month: string;
    year: string;
    weekday: string;
  };
  // Additional details about the day.
  attributes: {
    // Indicates if the day falls on a weekend (Saturday or Sunday).
    weekend: boolean;
    // Indicates if the day is today's date.
    today: boolean;
    // Indicates if the day is selected.
    selected: boolean;
    // Indicates if the day is highlighted.
    highlighted: boolean;
    // Indicates if the day is the start of a selected range.
    startRange: boolean;
    // Indicates if the day is part of a selected range.
    inRange: boolean;
    // Indicates if the day is the end of a selected range.
    endRange: boolean;
    // Indicates if the day is locked and cannot be interacted with.
    locked: boolean;
    // Indicates if the day is disabled and cannot be selected or interacted with.
    disabled: boolean;
    siblingMonthDays: boolean;
  };
  // Highlighted details about the day.
  details?: T;
};

/**
 * Represents a calendar with configurable options for language, date format, and week start day.
 */
export class HelloWeek<T> {
  private options: HelloWeekProps<T> = {
    lang: "en-UK",
    defaultDate: new Date(),
    weekStart: DAYS_WEEK.SUNDAY,
    highlightedToday: true,
    disabledPastDates: false,
    locked: false,
  };
  private highlightedDates: HighlightedDates<T>[];
  private date: Date;
  private today: Date;
  private days: DayOptions<T>[] = [];

  /**
   * Creates a new instance of the Calendar class.
   * @param options - The configuration options for the calendar.
   */
  constructor(options?: HelloWeekProps<T>) {
    const defaultOptions: HelloWeekProps<T> = {
      ...this.options,
      ...options,
      formatDate: {
        ...options?.formatDate,
        day: options?.formatDate?.day || "numeric",
        month: options?.formatDate?.month || "2-digit",
        year: options?.formatDate?.year || "numeric",
        weekday: options?.formatDate?.weekday || "short",
      },
    };

    // Configuration options for the calendar.
    this.options = defaultOptions;

    this.highlightedDates = options?.highlightedDates || [];
    // The current date in the calendar.
    this.date = defaultOptions.defaultDate;
    // Set the day of the current date to the first day of the month.
    this.date.setDate(1);
    // Today's date with time set to midnight (00:00:00).
    this.today = new Date(new Date().setHours(0, 0, 0, 0));
    // Create array with days of month.
    this.createMonth();
  }

  /**
   * Sets calendar options.
   * This method allows you to modify the calendar options either by providing a new options object or by using a callback function to modify the existing options.
   *
   * @remarks
   * The `options` parameter can be either an options object of type {@link IOptions},
   * which will replace all current options with the provided ones,
   * or a callback function that takes the previous options as an argument and returns the updated options.
   * When using a callback, the function allows you to modify multiple options at once while preserving the previous options that are not explicitly modified.
   *
   * @example
   * ```ts
   * // Replace all current options with new options.
   * calendar.setOptions({
   *     lang: 'en-US',
   *     format: {
   *         day: 'numeric',
   *         month: 'long',
   *         year: 'numeric',
   *         weekday: 'short',
   *     },
   *     weekStart: 1,
   * });
   *```
   *
   * @example
   * ```ts
   * // Modify specific options using a callback function.
   * calendar.setOptions((prev) => ({
   *     ...prev,
   *     lang: 'fr-FR',
   *     weekStart: 0,
   * }));
   * ```
   *
   * @param options - The calendar options, or a callback function with previous options.
   */
  public setOptions(options: ((prev: HelloWeekProps<T>) => HelloWeekProps<T>) | HelloWeekProps<T>) {
    if (typeof options === "function") {
      this.options = options(this.options);
    } else {
      this.options = { ...this.options, ...options };
    }

    // Create array with days of month.
    this.createMonth();
  }

  /**
   * Move to the previous month.
   * This method updates the current date to the previous month.
   */
  public prevMonth(): void {
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.createMonth();
  }

  /**
   * Move to the next month.
   * This method updates the current date to the next month.
   */
  public nextMonth(): void {
    const nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.createMonth();
  }

  /**
   * Move to the previous year.
   * This method updates the current date to the previous year.
   */
  public prevYear(): void {
    const prevYear = this.date.getFullYear() - 1;
    this.date.setFullYear(prevYear);
    this.createMonth();
  }

  /**
   * Move to the next year.
   * This method updates the current date to the next year.
   */
  public nextYear(): void {
    const nextYear = this.date.getFullYear() + 1;
    this.date.setFullYear(nextYear);
    this.createMonth();
  }

  /**
   * Sets the calendar to a specific date and updates the displayed month.
   * @param date - The target date to navigate to.
   */
  public gotoDate(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    this.date.setFullYear(year, month); // Update year and month together
    this.createMonth();
  }

  /**
   * Gets the week days for the current month in the specified language and format.
   * @returns An array of string with each day of week.
   */
  public getWeekDays(): string[] {
    const { lang, formatDate: format, weekStart } = this.options;
    const weekLength = 7;

    // Define the formatter for the day names
    const dayFormatter = new Intl.DateTimeFormat(lang as string, {
      weekday: format?.weekday || "short",
    });

    // Create an array of weekdays starting from the specified weekStart
    return Array.from({ length: weekLength }, (_, index) => {
      // Calculate the day index starting from weekStart
      const dayIndex = ((weekStart || DAYS_WEEK.SUNDAY) + index) % weekLength;

      // Create a valid reference date, setting the day directly (Sunday is day 0)
      const referenceDate = new Date(Date.UTC(1970, 0, 4 + dayIndex)); // January 4, 1970 is a Sunday in UTC

      // Format the weekday name using the DateTimeFormat instance
      return dayFormatter.format(referenceDate);
    });
  }

  /**
   * Gets the day options for the current month.
   * @returns An array of day options for the current month.
   */
  public getDays(): DayOptions<T>[] {
    return this.days;
  }

  /**
   * Get the current date.
   * @param options - An optional object containing the format for the date.
   * @returns The today's date.
   */
  public getToday(options?: { format?: Intl.DateTimeFormatOptions }): string {
    const { lang, formatDate } = this.options;
    const format = options?.format || formatDate;
    return this.today.toLocaleDateString(lang, {
      ...format,
      weekday: undefined,
    });
  }

  /**
   * Get the month string representation for the current month.
   * @param options - An optional object containing the format for the month string.
   * @returns The month string representation.
   */
  public getMonth(options?: { format?: Intl.DateTimeFormatOptions["month"] }): string {
    const { lang, formatDate } = this.options;
    const format = options?.format || formatDate?.month;
    return this.date.toLocaleDateString(lang, { month: format });
  }

  /**
   * Get the year string representation for the current year.
   * @param options - An optional object containing the format for the year string.
   * @returns The year string representation.
   */
  public getYear(options?: { format?: Intl.DateTimeFormatOptions["year"] }): string {
    const { lang, formatDate } = this.options;
    const format = options?.format || formatDate?.year;
    return this.date.toLocaleDateString(lang, { year: format });
  }

  public getDaysHighlight(): HighlightedDates<T>[] {
    return this.highlightedDates as HighlightedDates<T>[];
  }

  private createMonth(): void {
    this.days = [];

    // Save the current month and year.
    const currentMonth = this.date.getMonth();
    const currentYear = this.date.getFullYear();

    // Get the first day of the month.
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    let firstWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

    // Adjust for the configured start of the week.
    firstWeekday = (firstWeekday - (this.options.weekStart || DAYS_WEEK.SUNDAY) + 7) % 7;

    // Add previous month's days if the first day of the current month isn't the week start.
    if (firstWeekday > 0) {
      const prevMonth = new Date(currentYear, currentMonth, 0); // Last day of the previous month
      const lastDatePrevMonth = prevMonth.getDate(); // Get last date of the previous month
      for (let i = firstWeekday - 1; i >= 0; i--) {
        const prevDate = new Date(currentYear, currentMonth - 1, lastDatePrevMonth - i);
        this.createDay(prevDate, currentMonth); // Add previous month's day
      }
    }

    // Iterate through all days of the current month.
    while (this.date.getMonth() === currentMonth) {
      this.createDay(this.date, currentMonth);
      this.date.setDate(this.date.getDate() + 1);
    }

    // Get the last day of the month and check if more days from the next month are needed.
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Last day of current month
    let lastWeekday = lastDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

    // Adjust for the configured start of the week.
    lastWeekday = (lastWeekday - (this.options.weekStart || DAYS_WEEK.SUNDAY) + 7) % 7;

    // Add next month's days if the last day of the current month isn't the week end.
    if (lastWeekday < 6) {
      for (let i = 1; i <= 6 - lastWeekday; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        this.createDay(nextDate, currentMonth); // Add next month's day
      }
    }

    // Reset the date back to the first of the current month.
    this.date.setMonth(currentMonth);
    this.date.setDate(1);
  }

  private createDay(date: Date, currentMonth: number): void {
    const {
      lang,
      formatDate: format,
      selectedDates,
      highlightedToday,
      highlightedDates,
      maxDate,
      minDate,
      locked,
      disabledDaysOfWeek,
      disabledPastDates,
      disabledDates,
    } = this.options;

    const weekday = date.getDay() as WeekdaysValues;

    const dayOptions: DayOptions<T> = {
      date: new Date(date.setHours(0, 0, 0, 0)),
      dateObject: {
        day: date.toLocaleDateString(lang, { day: format?.day }),
        month: date.toLocaleDateString(lang, { month: format?.month }),
        year: date.toLocaleDateString(lang, { year: format?.year }),
        weekday: date.toLocaleDateString(lang, {
          weekday: format?.weekday,
        }),
      },
      dateFormatted: date.toLocaleDateString(lang, {
        day: format?.day,
        month: format?.month,
        year: format?.year,
      }),
      attributes: {
        today: false,
        weekend: false,
        selected: false,
        highlighted: false,
        inRange: false,
        startRange: false,
        endRange: false,
        locked: false,
        disabled: false,
        siblingMonthDays: date.getMonth() !== currentMonth,
      },
    };

    // Determining if the day is today.
    if (isToday(date) && highlightedToday) {
      dayOptions.attributes.today = true;
    }

    // Determining if the day is weekday.
    if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
      dayOptions.attributes.weekend = true;
    }

    // Determining if the day is selected based on specific dates or a range of dates.
    if (
      selectedDates?.some((day) => {
        if (isArray(day)) {
          // For a range of dates, check if the day falls within the range.
          const [start, end] = day;
          // If the day is the same as the start date or after the start date,
          // and the day is the same as the end date or before the end date, it's within the range.
          const inRange = !!start && !!end && isDateInRange(date, start, end);
          // Update range-related properties.
          dayOptions.attributes.inRange = inRange;
          dayOptions.attributes.startRange = !!start && isSameDay(date, start);
          dayOptions.attributes.endRange = !!end && isSameDay(date, end);

          return inRange;
        } else {
          // For specific dates, check if the day matches any of the selected dates.
          return isSameDay(day as Date, date);
        }
      })
    ) {
      dayOptions.attributes.selected = true;
    }

    // Determine if the current day is highlighted based on specific dates or date ranges.
    if (
      highlightedDates?.some(({ days, data }) => {
        const isHighlighted = days.some((day) => {
          if (isArray(day)) {
            // Handle date range: Extract start and end dates.
            const [start, end] = day;
            // Check if the current date falls within the range.
            return !!start && !!end && isDateInRange(date, start, end);
          } else {
            // Handle specific dates: Check if the current date matches any of the highlighted dates.
            return isSameDay(day as Date, date);
          }
        });

        if (isHighlighted) {
          // Assign additional properties for highlighting.
          dayOptions.details = data;
          // Indicate that the day is highlighted.
          return true;
        }

        return false; // Indicate that the day is not highlighted.
      })
    ) {
      dayOptions.attributes.highlighted = true;
    }

    // Determining if the day is disabled based on specific dates, weekdays, or past dates.
    if (
      disabledDates?.some((day) => {
        // Checking if the day is disabled based on a range of dates.
        if (isArray(day)) {
          const [start, end] = day;
          // For each range of dates, check if the day falls within the range.
          return !!start && !!end && isDateInRange(date, start, end);
        } else {
          return isSameDay(day as Date, date);
        }
      }) || // Checking if the day is disabled based on specific weekdays.
      (disabledDaysOfWeek && disabledDaysOfWeek.includes(weekday)) ||
      // Checking if the day is disabled based on past dates.
      (disabledPastDates && isDateBefore(date, this.today))
    ) {
      dayOptions.attributes.disabled = true;
    }

    // Determining if the day is locked.
    if (
      locked || // If the entire calendar or a specific day is locked, it should be considered locked.
      (minDate && isDateBefore(date, minDate)) || // If a `minDate` is specified and the date is before the `minDate`, the day should be considered locked.
      (maxDate && isDateAfter(date, maxDate)) // If a `maxDate`` is specified and the date is after the `maxDate`, the day should be considered locked.
    ) {
      dayOptions.attributes.locked = true; // Set the locked property to true to indicate the day is locked.
    }

    this.days.push(dayOptions);
  }
}
