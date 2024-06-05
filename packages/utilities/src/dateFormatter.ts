interface dateFormatterOptions {
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
 * ```typescript
 * const formattedDate = dateFormatter({ date: new Date(), locale: 'en-GB', options: { year: 'numeric', month: 'long', day: 'numeric' } });
 * console.log(formattedDate); // e.g., "20 June 2023"
 * ```
 */
export function dateFormatter({ date, locale, options }: dateFormatterOptions): string {
  const dt = typeof date === "string" ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(dt);
}
