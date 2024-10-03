import React, { useMemo } from "react";
// UI Components
import { TextField, Popover, Calendar } from "../..";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DatePickerProps {
  value: Date;
  lang?: string;
  disabledPastDates?: boolean;
  formatDate: Intl.DateTimeFormatOptions;
  onChange: (value: Date) => void;
  className?: string;
}

/**
 * DatePicker component to provide a overlay behind other content.
 *
 * @example
 * ```tsx
 * <DatePicker blur />
 * ```
 *
 * @remarks
 * This component extends `React.ComponentPropsWithoutRef<"div">`.
 *
 * @param {DatePickerProps} props - The props for the DatePicker component.
 * @returns {React.ReactElement} - The rendered DatePicker component.
 */
export function DatePicker({
  value,
  onChange,
  disabledPastDates,
  className,
  lang = "en-UK",
  formatDate = {
    weekday: "narrow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  ...props
}: DatePickerProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.DatePicker, styles });

  // Define the formatter for the day names
  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(lang, { ...formatDate, weekday: undefined }),
    [formatDate, lang],
  );

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
    dropdown: getElement(["dropdown"]),
  };

  console.log("value", value);

  return (
    <Popover<HTMLInputElement>
      renderAnchor={({ ref, open }) => (
        <TextField
          fullWidth={false}
          rootRef={ref}
          onFocus={open}
          value={value ? dayFormatter.format(value) : ""}
          onChange={() => {}}
        />
      )}
      offset={6}
      placement="bottom-start"
      className={cssClasses.dropdown}>
      {({ close }) => (
        <Calendar
          {...props}
          lang={lang}
          defaultDate={value ? new Date(value) : undefined}
          selectedDates={value ? [value] : undefined}
          disabledPastDates={disabledPastDates}
          siblingMonthDays={true}
          formatDate={{
            ...formatDate,
            day: "numeric",
          }}
          onDaySelected={({ date }) => {
            onChange(date);
            close();
          }}
        />
      )}
    </Popover>
  );
}
