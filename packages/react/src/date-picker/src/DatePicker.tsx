import React, { useMemo } from "react";
// UI Components
import { TextField, Popover, Calendar, type DateOrArrayDates, type WeekdaysValues } from "../..";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DatePickerProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  defaultValue: Date;
  value: Date;
  lang?: string;
  // The numeric value corresponding to the start day of the week (0 for Sunday, 1 for Monday, etc.).
  weekStart?: WeekdaysValues;
  // An array of disabled dates on the calendar.
  disabledDates?: DateOrArrayDates;
  // Indicates if past dates are disabled on the calendar.
  disabledPastDates?: boolean;
  // An array of numeric values corresponding to days of the week to be disabled on the calendar.
  disabledDaysOfWeek?: WeekdaysValues[];
  weekdayShort?: boolean;
  prevMonthLabel?: string;
  nextMonthLabel?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: Date) => void;
}

/**
 * Date Picker component...
 *
 * @example
 * ```tsx
 * <DatePicker defaultValue={new Date()} />
 * ```
 *
 * @param {DatePickerProps} props - The props for the DatePicker component.
 * @returns {React.ReactElement} - The rendered DatePicker component.
 */
export function DatePicker({
  placeholder,
  leftSlot,
  rightSlot,
  defaultValue,
  value,
  weekStart,
  disabledDates,
  disabledDaysOfWeek,
  disabledPastDates,
  lang = "en-UK",
  weekdayShort,
  prevMonthLabel,
  nextMonthLabel,
  className,
  onChange,
}: DatePickerProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.DatePicker, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
    dropdown: getElement(["dropdown"]),
  };

  const initialValue = useMemo(
    () =>
      value || defaultValue
        ? new Intl.DateTimeFormat(lang, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(value || defaultValue)
        : "",
    [defaultValue, lang, value],
  );

  return (
    <Popover<HTMLInputElement>
      renderAnchor={({ ref, open }) => (
        <TextField
          fullWidth={false}
          rootRef={ref}
          onFocus={open}
          value={initialValue}
          readOnly
          leftSlot={leftSlot}
          rightSlot={rightSlot}
          placeholder={placeholder}
        />
      )}
      offset={6}
      placement="bottom-start"
      className={cssClasses.dropdown}>
      {({ close }) => (
        <Calendar
          lang={lang}
          weekStart={weekStart}
          defaultDate={value ? new Date(value) : undefined}
          selectedDates={value ? [value] : undefined}
          disabledDaysOfWeek={disabledDaysOfWeek}
          disabledPastDates={disabledPastDates}
          disabledDates={disabledDates}
          nextMonthLabel={nextMonthLabel}
          prevMonthLabel={prevMonthLabel}
          formatDate={{
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: weekdayShort ? "short" : "narrow",
          }}
          onDaySelected={({ date }) => {
            onChange(date);
            close();
          }}
          siblingMonthDays
        />
      )}
    </Popover>
  );
}
