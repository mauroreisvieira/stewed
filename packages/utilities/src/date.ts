interface DateFormatterOptions {
  /** The date to be formatted. It can be a Date object or a string representing a date. */
  date: Date | string;
  /** The locale to be used for date formatting. */
  locale?: Intl.LocalesArgument;
  /**
   * The options for date formatting.
   * These options conform to the Intl.DateTimeFormatOptions interface.
   */
  options?: Intl.DateTimeFormatOptions;
}

/**
 * Formats a date according to the specified locale and options.
 *
 * @param params - An object containing the date to be formatted, optional locale, and formatting options.
 * @returns A string representing the formatted date. If the date is null or undefined, returns an empty string.
 *
 * @example
 * ```ts
 * const formattedDate = dateFormatter({ date: new Date(), locale: 'en-GB', options: { year: 'numeric', month: 'long', day: 'numeric' } });
 * console.log(formattedDate); // e.g., "20 June 2023"
 * ```
 */
export function dateFormatter({ date, locale, options }: DateFormatterOptions): string {
  const dt = typeof date === "string" ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(dt);
}

/**
 * Checks if two dates represent the same day (day, month, and year).
 *
 * @param date - The first date to compare.
 * @param dateToCompare - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same day.
 */
export function isSameDay(date: Date, dateToCompare: Date): boolean {
  return (
    date.getDate() === dateToCompare.getDate() &&
    date.getMonth() === dateToCompare.getMonth() &&
    date.getFullYear() === dateToCompare.getFullYear()
  );
}

/**
 * Checks if a date is after another date.
 *
 * @param date - The date to check.
 * @param dateToCompare - The date to compare against.
 * @returns A boolean indicating whether the first date is after the second date.
 */
export function isDateAfter(date: Date, dateToCompare: Date | string): boolean {
  const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
  return date.getTime() > new Date(toCompare.setHours(0, 0, 0, 0)).getTime();
}

/**
 * Checks if a date is before another date.
 *
 * @param date - The date to check.
 * @param dateToCompare - The date to compare against.
 * @returns A boolean indicating whether the first date is before the second date.
 */
export function isDateBefore(date: Date, dateToCompare: Date | string): boolean {
  const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
  return date.getTime() < new Date(toCompare.setHours(0, 0, 0, 0)).getTime();
}

/**
 * Checks if two dates represent the same month and year.
 *
 * @param source - The first date to compare.
 * @param dateToCompare - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same month and year.
 */
export function isSameMonthAndYear(source: Date, dateToCompare?: Date): boolean {
  return (
    source.getFullYear() === dateToCompare?.getFullYear() &&
    source.getMonth() === dateToCompare?.getMonth()
  );
}

/**
 * Checks if two dates represent the same date (day, month, year).
 *
 * @param date - The first date to compare.
 * @param dateToCompare - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same date.
 */
export function isSameDate(date: Date, dateToCompare: Date | string): boolean {
  const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
  return isSameMonthAndYear(date, toCompare) && date.getDate() === toCompare.getDate();
}

/**
 * Checks if a date represents today's date.
 *
 * @param date - The date to check.
 * @returns A boolean indicating whether the date represents today's date.
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDate(today, date);
}

/**
 * Checks if a given date is within a specified date range.
 *
 * @param {Date} date - The date to check.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns A boolean indicating whether date is within the range.
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return (
    (isSameDay(date, startDate) || isDateAfter(date, startDate)) &&
    (isSameDay(date, endDate) || isDateBefore(date, endDate))
  );
}
