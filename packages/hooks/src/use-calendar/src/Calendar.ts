import {
  isToday,
  isDateAfter,
  isDateBefore,
  isSameDay,
  isDateInRange,
  isArray,
} from "@stewed/utilities";

const DAYS_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

type Weekdays = typeof DAYS_WEEK;

// Represents the numeric values of days of the week.
export type WeekdaysValues = Weekdays[keyof Weekdays];

// Represents either a single Date object or a range of two Date objects.
export type DateOrArrayDates = (Date | [Date, Date])[];

export interface HighlightedDates<T> {
  /** Explicitly typed 'days' property for individual dates or date ranges. */
  days: DateOrArrayDates;
  /** Other properties can be of type T. */
  data?: T;
}

export interface CalendarOptions<T> {
  /** The default date to display on the calendar. */
  defaultDate?: Date;
  /** The language/locale to use for date formatting. */
  lang?: Intl.LocalesArgument;
  /** The date format options for formatting dates. */
  formatDate?: Intl.DateTimeFormatOptions;
  /** The numeric value corresponding to the start day of the week (0 for Sunday, 1 for Monday, etc.). */
  weekStart?: WeekdaysValues;
  /** An array of selected dates for the calendar. */
  selectedDates?: DateOrArrayDates;
  /** An array of dates to highlight on the calendar. */
  highlightedDates?: HighlightedDates<T>[];
  /** An array of disabled dates on the calendar. */
  disabledDates?: DateOrArrayDates;
  /** Indicates if past dates are disabled on the calendar. */
  disabledPastDates?: boolean;
  /** An array of numeric values corresponding to days of the week to be disabled on the calendar. */
  disabledDaysOfWeek?: WeekdaysValues[];
  /** The minimum selectable date on the calendar. */
  minDate?: Date;
  /** The maximum selectable date on the calendar. */
  maxDate?: Date;
  /** Indicates if the calendar is locked and cannot be interacted with. */
  locked?: boolean;
  /** Indicates if today's date should be highlighted on the calendar. */
  highlightedToday?: boolean;
}

export interface DayOptions<T> {
  /** The date object representing the day. */
  date: Date;
  /** The formatted string representation of the day's date. */
  dateFormatted: string;
  /** The date object containing individual parts of the day's date. */
  dateObject: {
    day: string;
    month: string;
    year: string;
    weekday: string;
  };
  /** Additional details about the day. */
  attributes: {
    /** Indicates if the day falls on a weekend (Saturday or Sunday). */
    weekend: boolean;
    /** Indicates if the day is today's date. */
    today: boolean;
    /** Indicates if the day is selected. */
    selected: boolean;
    /** Indicates if the day is highlighted. */
    highlighted: boolean;
    /** Indicates if the day is the start of a selected range. */
    startRange: boolean;
    /** Indicates if the day is part of a selected range. */
    inRange: boolean;
    /** Indicates if the day is the end of a selected range. */
    endRange: boolean;
    /** Indicates if the day is locked and cannot be interacted with. */
    locked: boolean;
    /** Indicates if the day is disabled and cannot be selected or interacted with. */
    disabled: boolean;
    /** Indicates if the day belongs to a sibling month (previous or next) in the current view. */
    siblingMonthDays: boolean;
  };
  /** Highlighted details about the day. */
  details?: T;
}

export class Calendar<T> {
  /**
   * Configuration options for the calendar.
   * These options control the calendar's language, starting day of the week, and various features
   * like highlighting today's date, disabling past dates, and locking the calendar.
   */
  private options: CalendarOptions<T> = {
    lang: "en-UK",
    weekStart: DAYS_WEEK.SUNDAY,
    highlightedToday: true,
    disabledPastDates: false,
    locked: false,
  };

  /**
   * An array of highlighted dates.
   * Stores the dates that are highlighted in the calendar.
   */
  private highlightedDates: HighlightedDates<T>[];

  /**
   * The current date object.
   * Represents the currently selected or viewed date in the calendar.
   */
  private date: Date;

  /**
   * Today's date object.
   * Represents the current real-world date, used to highlight or display today's date.
   */
  private today: Date;

  /**
   * An array of day options for the calendar.
   * Each object in the array represents a day's options, such as its date, status, and any additional
   * configurations.
   */
  private days: DayOptions<T>[] = [];

  /**
   * Creates a new instance of the Calendar class.
   * @param options - The configuration options for the calendar.
   */
  constructor(options?: CalendarOptions<T>) {
    const defaultOptions: CalendarOptions<T> = {
      ...this.options,
      ...options,
      formatDate: {
        ...options?.formatDate,
        day: options?.formatDate?.day || "numeric",
        month: options?.formatDate?.month || "long",
        year: options?.formatDate?.year || "numeric",
        weekday: options?.formatDate?.weekday || "short",
      },
    };

    // Configuration options for the calendar.
    this.options = defaultOptions;

    // The array of highlighted dates.
    this.highlightedDates = options?.highlightedDates || [];

    // The current date in the calendar.
    this.date = defaultOptions.defaultDate || new Date();

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
   * The `options` parameter can be either an options object of type {@link CalendarOptions},
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
  public setOptions(
    options: ((prev: CalendarOptions<T>) => CalendarOptions<T>) | CalendarOptions<T>,
  ) {
    if (typeof options === "function") {
      this.options = options(this.options);
    } else {
      this.options = { ...this.options, ...options };
    }

    // Create array with days of month.
    this.createMonth();
  }

  /**
   * Set the month for the current date.
   * This method updates the current date to the specified month and regenerates the month view.
   * @param month - The month to set (0-based index, where 0 is January and 11 is December).
   */
  public setMonth(month: number): void {
    this.date.setMonth(month);
    this.createMonth();
  }

  /**
   * Set the year for the current date.
   * This method updates the current date to the specified year and regenerates the month view.
   * @param year - The year to set.
   */
  public setYear(year: number): void {
    this.date.setFullYear(year);
    this.createMonth();
  }

  /**
   * Move to the previous month.
   * This method updates the current date to the previous month.
   */
  public prevMonth(): void {
    const prevMonth = this.date.getMonth() - 1;
    this.setMonth(prevMonth);
  }

  /**
   * Move to the next month.
   * This method updates the current date to the next month.
   */
  public nextMonth(): void {
    const nextMonth = this.date.getMonth() + 1;
    this.setMonth(nextMonth);
  }

  /**
   * Move to the previous year.
   * This method updates the current date to the previous year.
   */
  public prevYear(): void {
    const prevYear = this.date.getFullYear() - 1;
    this.setYear(prevYear);
  }

  /**
   * Move to the next year.
   * This method updates the current date to the next year.
   */
  public nextYear(): void {
    const nextYear = this.date.getFullYear() + 1;
    this.setYear(nextYear);
  }

  /**
   * Sets the calendar to a specific date and updates the displayed month.
   * @param date - The target date to navigate to.
   */
  public setDate(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update year and month together
    this.date.setFullYear(year, month);
    this.createMonth();
  }

  /**
   * Gets the week days for the current month in the specified language and format.
   * @returns An array of string with each day of week.
   */
  public getWeekDays(): string[] {
    const weekLength = 7;

    // Define the formatter for the day names
    const dayFormatter = new Intl.DateTimeFormat(this.options.lang, {
      weekday: this.options.formatDate?.weekday || "short",
    });

    // Create an array of weekdays starting from the specified weekStart
    return Array.from({ length: weekLength }, (_, index) => {
      // Calculate the day index starting from weekStart
      const dayIndex = ((this.options.weekStart || DAYS_WEEK.SUNDAY) + index) % weekLength;

      // Create a valid reference date, setting the day directly (Sunday is day 0)
      const referenceDate = new Date(Date.UTC(1970, 0, 4 + dayIndex));

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
    const format = options?.format || this.options.formatDate;
    return this.today.toLocaleDateString(this.options.lang, {
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
    const format = options?.format || this.options.formatDate?.month;
    return this.date.toLocaleDateString(this.options.lang, { month: format });
  }

  /**
   * Get the year string representation for the current year.
   * @param options - An optional object containing the format for the year string.
   * @returns The year string representation.
   */
  public getYear(options?: { format?: Intl.DateTimeFormatOptions["year"] }): string {
    const format = options?.format || this.options.formatDate?.year;
    return this.date.toLocaleDateString(this.options.lang, { year: format });
  }

  /**
   * Retrieve the highlighted dates.
   * This method returns the dates that have been marked as highlighted.
   * @returns An array of highlighted dates.
   */
  public getDaysHighlight(): HighlightedDates<T>[] {
    return this.highlightedDates as HighlightedDates<T>[];
  }

  private createMonth(): void {
    // Initialize the days as empty array
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
    this.date.setFullYear(currentYear);
    this.date.setDate(1);
  }

  private createDay(date: Date, currentMonth: number): void {
    const weekday = date.getDay() as WeekdaysValues;

    const dayOptions: DayOptions<T> = {
      date: new Date(date.setHours(0, 0, 0, 0)),
      dateObject: {
        day: date.toLocaleDateString(this.options.lang, { day: this.options.formatDate?.day }),
        month: date.toLocaleDateString(this.options.lang, {
          month: this.options.formatDate?.month,
        }),
        year: date.toLocaleDateString(this.options.lang, { year: this.options.formatDate?.year }),
        weekday: date.toLocaleDateString(this.options.lang, {
          weekday: this.options.formatDate?.weekday,
        }),
      },
      dateFormatted: date.toLocaleDateString(this.options.lang, {
        day: this.options.formatDate?.day,
        month: this.options.formatDate?.month,
        year: this.options.formatDate?.year,
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
    if (isToday(date) && this.options.highlightedToday) {
      dayOptions.attributes.today = true;
    }

    // Determining if the day is weekday.
    if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
      dayOptions.attributes.weekend = true;
    }

    // Determining if the day is selected based on specific dates or a range of dates.
    if (
      this.options.selectedDates?.some((day) => {
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
      this.options.highlightedDates?.some(({ days, data }) => {
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
      this.options.disabledDates?.some((day) => {
        // Checking if the day is disabled based on a range of dates.
        if (isArray(day)) {
          const [start, end] = day;
          // For each range of dates, check if the day falls within the range.
          return !!start && !!end && isDateInRange(date, start, end);
        } else {
          return isSameDay(day as Date, date);
        }
      }) || // Checking if the day is disabled based on specific weekdays.
      (this.options.disabledDaysOfWeek && this.options.disabledDaysOfWeek.includes(weekday)) ||
      // Checking if the day is disabled based on past dates.
      (this.options.disabledPastDates && isDateBefore(date, this.today))
    ) {
      dayOptions.attributes.disabled = true;
    }

    // Determining if the day is locked.
    if (
      this.options.locked || // If the entire calendar or a specific day is locked, it should be considered locked.
      (this.options.minDate && isDateBefore(date, this.options.minDate)) || // If a `minDate` is specified and the date is before the `minDate`, the day should be considered locked.
      (this.options.maxDate && isDateAfter(date, this.options.maxDate)) // If a `maxDate`` is specified and the date is after the `maxDate`, the day should be considered locked.
    ) {
      dayOptions.attributes.locked = true; // Set the locked property to true to indicate the day is locked.
    }

    this.days.push(dayOptions);
  }
}
