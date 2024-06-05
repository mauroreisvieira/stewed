import { useCallback } from "react";
// Utilities
import { dateFormatter } from "@stewed/utilities";

interface FormatDateTimeReturnBoolean {
  /**
   * Checks if the current date is the same day as the specified date.
   *
   * @param date - The date to compare.
   * @returns True if the dates are the same day, false otherwise.
   */
  isSameDay(date: Date | string): boolean;
  /**
   * Checks if the current date is today.
   *
   * @returns True if the current date is today, false otherwise.
   */
  isToday(): boolean;
  /**
   * Checks if the current date is after the specified date.
   *
   * @param date - The date to compare.
   * @returns True if the current date is after the specified date, false otherwise.
   */
  isAfter(date: Date | string): boolean;
  /**
   * Checks if the current date is before the specified date.
   *
   * @param date - The date to compare.
   * @returns True if the current date is before the specified date, false otherwise.
   */
  isBefore(date: Date | string): boolean;
  /**
   * Checks if the current date is the same day or before the specified date.
   *
   * @param date - The date to compare.
   * @returns True if the current date is the same day or before the specified date, false otherwise.
   */
  isSameOrBefore(date: Date | string): boolean;
  /**
   * Checks if the current date is the same day or after the specified date.
   *
   * @param date - The date to compare.
   * @returns True if the current date is the same day or after the specified date, false otherwise.
   */
  isSameOrAfter(date: Date | string): boolean;
}

// Interface for date and time manipulation providing various operations and formatting.
export interface FormatDateTime extends FormatDateTimeReturnBoolean {
  /**
   * Adds a specified value to the current date.
   *
   * @param value - The numeric value to add.
   * @param unit - The unit of time to add, can be "days", "months", or "years".
   * @returns The modified FormatDateTime object.
   */
  add(value: number, unit: "days" | "months" | "years"): FormatDateTime;
  /**
   * Subtracts a specified value from the current date.
   *
   * @param value - The numeric value to subtract.
   * @param unit - The unit of time to subtract, can be "days", "months", or "years".
   * @returns The modified FormatDateTime object.
   */
  subtract(value: number, unit: "days" | "months" | "years"): FormatDateTime;
  /**
   * Formats the current date as a string with optional date and time styles.
   *
   * @param options - Formatting options, including dateStyle and timeStyle.
   * @returns The formatted date as a string.
   */
  format(dateTimeFormatOptions?: Intl.DateTimeFormatOptions): string;
  /**
   * Formats the current date as an ISO string (YYYY-MM-DD).
   *
   * @returns The formatted date as an ISO string.
   */
  formatAsISO(): string;
  /**
   * Retrieves the current date.
   *
   * @returns The current date as a Date object.
   */
  currentDate(): Date;
  /**
   * Calculates the difference between the current date and the specified date.
   *
   * @param value - The date or date string to compare with the current date.
   * @param unit - The unit of time to calculate the difference in, can be "days", "months", or "years".
   * @returns The difference in the specified unit of time.
   */
  diff(value: Date | string, unit: "days" | "months" | "years"): number;
  /**
   * Negates the results of boolean comparison methods.
   *
   * @returns {FormatDateTimeReturnBoolean} An object with methods for negated boolean comparisons.
   */
  not: FormatDateTimeReturnBoolean;
}

// Interface providing functions for creating and formatting date and time.
export interface UseFormatDateTime {
  /**
   * Creates a formatted date object with manipulation functions.
   *
   * @param date - Optional initial date for the created object. Defaults to the current date if not provided.
   * @returns An object with manipulation functions for the provided or current date.
   */
  createDate(date?: Date | string | null): FormatDateTime;

  /**
   * Formats a date as a string with optional date and time styles.
   *
   * @param date - The date to format. Defaults to the current date if not provided.
   * @param options - Formatting options, including dateStyle and timeStyle.
   * @returns The formatted date as a string.
   */
  formatDate(date?: Date | string, dateTimeFormatOptions?: Intl.DateTimeFormatOptions): string;
}

interface UseDateTimeProps {
  /**
   * The locale to be used for date and time formatting.
   * This should follow the BCP 47 language tag format. For example, 'en-US' for American English.
   * @default en-US
   */
  locale: Intl.LocalesArgument;
}

/**
 * Hook providing date and time formatting functions.
 *
 * @param props - An object containing the locale to be used for formatting.
 * @returns An object containing date and time formatting functions.
 *
 * @example
 * ```typescript
 * const { createDate } = useDateTime({ locale: 'en-GB' });
 *
 * constole.log(createDate("2024-06-01").isSameOrBefore(new Date()));
 * ```
 */
export function useDateTime(options?: UseDateTimeProps): UseFormatDateTime {
  // Function to check if the current date is the same as the specified date
  const isSameDate = useCallback((date: Date, dateToCompare: Date | string) => {
    const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
    return (
      date.getDate() === toCompare.getDate() &&
      date.getMonth() === toCompare.getMonth() &&
      date.getFullYear() === toCompare.getFullYear()
    );
  }, []);

  // Function to check if the current date is before the specified date
  const isDateBefore = useCallback((date: Date, dateToCompare: Date | string) => {
    const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
    return date.getTime() < new Date(toCompare.setHours(0, 0, 0, 0)).getTime();
  }, []);

  // Function to check if the current date is after the specified date
  const isDateAfter = useCallback((date: Date, dateToCompare: Date | string) => {
    const toCompare = typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
    return date.getTime() > new Date(toCompare.setHours(0, 0, 0, 0)).getTime();
  }, []);

  // Function to format a specified date as a string with optional date and time styles
  const formatDate = useCallback<UseFormatDateTime["formatDate"]>(
    (date = new Date(), dateTimeFormatOptions) => {
      return dateFormatter({
        date,
        locale: options?.locale,
        options: dateTimeFormatOptions,
      });
    },
    [],
  );

  // Function to create a formatted date object with manipulation functions
  const createDate = useCallback<UseFormatDateTime["createDate"]>(
    function (date) {
      const originalDate = date || new Date();

      // Create a new instance if a date parameter is provided
      const currentDate = typeof originalDate === "string" ? new Date(originalDate) : originalDate;

      return {
        add: function (value, unit) {
          // Use the new instance for manipulation
          switch (unit) {
            case "months":
              currentDate.setMonth(currentDate.getMonth() + value);
              break;
            case "days":
              currentDate.setDate(currentDate.getDate() + value);
              break;
            case "years":
              currentDate.setFullYear(currentDate.getFullYear() + value);
              break;
          }
          return this;
        },
        subtract: function (value, unit) {
          // Use the new instance for manipulation
          switch (unit) {
            case "months":
              currentDate.setMonth(currentDate.getMonth() - value);
              break;
            case "days":
              currentDate.setDate(currentDate.getDate() - value);
              break;
            case "years":
              currentDate.setFullYear(currentDate.getFullYear() - value);
              break;
          }
          return this;
        },
        format: (dateTimeFormatOptions) => {
          return formatDate(currentDate, dateTimeFormatOptions);
        },
        formatAsISO: () =>
          `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`,
        currentDate: () => currentDate,
        diff: function (dateToCompare, unit) {
          // Convert the value to a Date object if it's a string
          const toCompare =
            typeof dateToCompare === "string" ? new Date(dateToCompare) : dateToCompare;
          // Calculate the difference in years, months, and days
          const diffUnits = {
            years:
              currentDate.getMonth() > toCompare.getMonth() ||
              (currentDate.getMonth() === toCompare.getMonth() &&
                currentDate.getDate() > toCompare.getDate())
                ? toCompare.getFullYear() - currentDate.getFullYear() - 1
                : toCompare.getFullYear() - currentDate.getFullYear(),
            months:
              toCompare.getMonth() +
              12 * toCompare.getFullYear() -
              (currentDate.getMonth() + 12 * currentDate.getFullYear()) -
              (toCompare.getDate() >= currentDate.getDate() ? 0 : 1),
            days: Math.round((toCompare.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          };
          // Use the new instance for manipulation
          switch (unit) {
            case "months":
              return diffUnits.months;
            case "days":
              return diffUnits.days;
            case "years":
              return diffUnits.years;
          }
        },
        isSameDay: (otherDate) => isSameDate(currentDate, otherDate),
        isToday: () => isSameDate(currentDate, new Date()),
        isBefore: (otherDate) => isDateBefore(currentDate, otherDate),
        isAfter: (otherDate) => isDateAfter(currentDate, otherDate),
        isSameOrBefore: (otherDate) =>
          isSameDate(currentDate, otherDate) || isDateBefore(currentDate, otherDate),
        isSameOrAfter: (otherDate) =>
          isSameDate(currentDate, otherDate) || isDateAfter(currentDate, otherDate),
        not: {
          isSameDay: (otherDate: Date) => !isSameDate(currentDate, otherDate),
          isToday: () => !isSameDate(currentDate, new Date()),
          isBefore: (otherDate: Date) => !isDateBefore(currentDate, otherDate),
          isAfter: (otherDate: Date) => !isDateAfter(currentDate, otherDate),
          isSameOrBefore: (otherDate: Date) =>
            !isSameDate(currentDate, otherDate) && !isDateBefore(currentDate, otherDate),
          isSameOrAfter: (otherDate: Date) =>
            !isSameDate(currentDate, otherDate) && !isDateAfter(currentDate, otherDate),
        },
      };
    },
    [formatDate, isDateAfter, isDateBefore, isSameDate],
  );

  // Return the formatted date and time functions
  return {
    createDate,
    formatDate,
  };
}
