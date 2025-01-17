/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useMemo, useRef, useState } from "react";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Styles
import styles from "./styles/index.module.scss";

/** Props for the Slider component. */
export interface SliderProps
  extends UseResponsiveProps<{
    /**
     * Specifies the size of the slider.
     * @default md
     */
    size?: "sm" | "md" | "lg";
  }> {
  /**
   * Specifies the visual style of the slider.
   * @default primary
   */
  skin?: "primary" | "neutral" | "secondary" | "critical" | "success";
  /** The minimum value the slider can have. */
  min?: number;
  /** The maximum value the slider can have. */
  max?: number;
  /** Specifies the increments at which the slider value can be set. */
  step?: number;
  /** The default value of the slider when uncontrolled. Can be a single number or an array of numbers. */
  defaultValue?: number | number[];
  /** The controlled value of the slider. Can be a single number or an array of numbers. */
  value?: number | number[];
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Additional class name for the root element. */
  className?: string;
  /** Callback triggered when the value changes. */
  onChange?: (value: number | number[]) => void;
}

/**
 * A Slider component for selecting a value within a specified range.
 * It supports both controlled and uncontrolled behaviors.
 *
 * @param props - The props for the Slider component.
 * @returns A React element representing the slider.
 */
export function Slider({
  size = "md",
  skin = "primary",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value,
  disabled = false,
  className,
  onChange
}: SliderProps): React.ReactElement {
  // A reference to the slider's root element (the div containing the slider).
  // This is used to access the DOM element of the slider directly, allowing for measurements.
  const sliderRef = useRef<HTMLDivElement>(null);

  // Determines whether the slider is controlled or uncontrolled.
  // A controlled slider has a value prop passed in, while an uncontrolled slider manages its own internal state.
  const isControlled = value !== undefined;

  const isMultiple = useMemo(
    () => Array.isArray(defaultValue) || Array.isArray(value),
    [defaultValue, value]
  );

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: "slider", styles });

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      size
    },
    activeToken.breakpoints
  );

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [skin, computedProps.size, disabled && "disabled", !isMultiple && "single"],
      extraClasses: className
    }),
    track: getElement(["track"]),
    indicator: getElement(["indicator"]),
    thumb: getElement(["thumb"])
  };

  // State to manage the internal value of the slider.
  // If the defaultValue is a single number, it is converted into an array.
  // This ensures that internalValue is always an array, even for a single thumb.
  const [internalValue, setInternalValue] = useState<number[]>(
    Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  );

  // Returns the active value of the slider.
  // If the slider is controlled, it returns the `value` prop.
  // If the slider is uncontrolled, it returns the internal state `internalValue`.
  const activeValue = useMemo(() => {
    if (isControlled) {
      // If controlled, ensure value is always an array
      return Array.isArray(value) ? value : [value];
    }

    // If uncontrolled, return the internal state
    return internalValue;
  }, [internalValue, isControlled, value]);

  /**
   * Finds the closest valid value to the provided one, clamping it within the range of [min, max].
   * The value is rounded to the nearest step increment.
   *
   * @param val - The value to find the closest match for.
   * @returns The closest valid value.
   */
  const findClosest = useCallback(
    (val: number): number => {
      if (val < min) return min; // Clamp to min if the value is less than min
      if (val > max) return max; // Clamp to max if the value exceeds max

      // Round to the nearest valid step value
      return Math.round((val - min) / step) * step + min;
    },
    [min, max, step]
  );

  /**
   * Converts a value to a percentage relative to the slider's range.
   * This is used to position the thumb on the slider based on the current value.
   *
   * @param val - The value to convert to a percentage.
   * @returns The percentage representation of the value.
   */
  const valueToPercent = useCallback(
    (val: number): number => {
      // The percentage is calculated based on the relative position of the value within the range
      return ((val - min) * 100) / (max - min);
    },
    [min, max]
  );

  /**
   * Converts a percentage to a value based on the slider's range.
   * This is used to update the value when the thumb is moved.
   *
   * @param percent - The percentage to convert to a value.
   * @returns The value corresponding to the percentage.
   */
  const percentToValue = useCallback(
    (percent: number): number => {
      // Calculate the value corresponding to the given percentage within the range
      return ((max - min) * percent) / 100 + min;
    },
    [min, max]
  );

  // Calculates the starting position of the slider track as a percentage.
  // If there are multiple thumbs (i.e., `activeValue` is an array), it uses the first value as the start.
  // If only a single thumb is used, the start is set to the value of the first thumb (or 0 if undefined).
  // This value is used to position the start of the track or the range between thumbs.
  const trackStart = useMemo(
    () =>
      Array.isArray(activeValue)
        ? valueToPercent((activeValue?.length > 1 ? activeValue[0] : 0) || 0) // For multiple thumbs, use the first thumb's value, defaulting to 0.
        : valueToPercent(activeValue || 0), // For single thumb, use the activeValue (defaulting to 0).
    [activeValue, valueToPercent]
  );

  // Calculates the ending position of the slider track as a percentage.
  // This is specifically for cases with multiple thumbs (i.e., `activeValue` is an array).
  // If the slider has multiple thumbs, this will represent the last thumb's position.
  // For a single thumb, this will reflect the same position as `trackStart`.
  const trackEnd = useMemo(
    () => valueToPercent(activeValue.at(-1) || 0), // For multiple thumbs, use the last thumb's value; defaults to 0.
    [activeValue, valueToPercent]
  );

  const updateValues = useCallback(
    (newValues: number[]): void => {
      if (!isControlled) {
        setInternalValue(newValues);
      }

      const valueToPass = (newValues.length === 1 ? newValues[0] : newValues) || 0;
      onChange?.(valueToPass);
    },
    [isControlled, onChange]
  );

  const updatePosition = useCallback(
    (position: number, index: number): void => {
      if (!sliderRef.current) return;

      // For multiple thumbs, adjust the min/max dynamically
      const updatedValues = [...activeValue];

      const { width } = sliderRef.current.getBoundingClientRect();
      const newValue = percentToValue((position / width) * 100);

      // If there's only one thumb, no need for array manipulation
      if (activeValue.length === 1) {
        // For a single thumb, just clamp the value within the range
        updatedValues[index] = Math.max(min, Math.min(max, newValue));
        updateValues(updatedValues);
      } else {
        if (index === 0) {
          // Thumb 0's max is the position of thumb 1 (index 1)
          updatedValues[index] = Math.min(newValue, (activeValue[1] || 0) - step);
        } else if (index === activeValue.length - 1) {
          // Thumb N's min is the position of the previous thumb (index N-1)
          updatedValues[index] = Math.max(newValue, (activeValue[index - 1] || 0) + step);
        } else {
          updatedValues[index] = findClosest(newValue);
        }

        // Sort values to maintain order
        updateValues(updatedValues.sort((a, b) => a - b));
      }
    },
    [activeValue, percentToValue, updateValues, step, min, max, findClosest]
  );

  const onHandleMove = useCallback(
    (event: MouseEvent | TouchEvent, index: number): void => {
      if (!sliderRef.current) {
        return;
      }

      const { left, width } = sliderRef.current.getBoundingClientRect();

      const clientX = ("touches" in event ? event.touches[0]?.clientX : event.clientX) || 0;

      updatePosition(Math.min(Math.max(clientX - left, 0), width), index);
    },
    [updatePosition]
  );

  const onHandleMouseDown = useCallback(
    (index: number) => {
      /**
       * Handles the mouse move event and invokes the `onHandleMove` function.
       * This function is responsible for updating the position of a thumb based on the movement of the mouse event.
       * It is used in conjunction with `onMouseDown` to track the user's dragging of the thumb.
       *
       * @param event - The mouse event that is triggered when the mouse moves.
       * The event contains information about the position of the mouse.
       */
      const onMouseMove = (event: MouseEvent | TouchEvent): void => {
        onHandleMove(event, index);
      };

      /**
       * Handles the mouse up  event. It is responsible for removing the mousemove event listener
       * that was added when the user starts dragging the thumb. This ensures that the dragging stops when the user releases the mouse.
       *
       * @returns This function does not return any value.
       */
      const onMouseUp = (): void => {
        document.removeEventListener("mousemove", onMouseMove);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp, { once: true });
    },
    [onHandleMove]
  );

  const onHandleTouchStart = useCallback(
    (index: number) => {
      /**
       * Handles the touch move event and invokes the `onHandleMove` function.
       * This function is responsible for updating the position of a thumb based on the movement of the touch.
       *
       * @param event - The touch or touch event that is triggered when the touch or touch moves.
       * The event contains information about the position of the touch or touch.
       */
      const onTouchMove = (event: MouseEvent | TouchEvent): void => {
        onHandleMove(event, index);
      };

      /**
       * Handles the touch end  event.
       * It is responsible for removing the touchmove event listener that was added when the user starts dragging the thumb.
       * This ensures that the dragging stops when the user releases the touch.
       *
       * @returns This function does not return any value.
       */
      const onTouchEnd = (): void => {
        document.removeEventListener("touchmove", onTouchMove);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd, { once: true });
    },
    [onHandleMove]
  );

  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number): void => {
      // If activeValue is undefined or invalid, initialize it
      const currentValue = Array.isArray(activeValue)
        ? (activeValue[index] ?? min)
        : (activeValue ?? min);

      // Clone the array or use single value for updates
      const updatedValue = Array.isArray(activeValue) ? [...activeValue] : [currentValue];

      if (!updatedValue.length || !updatedValue[index]) {
        return;
      }

      // Adjust value based on key press
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        updatedValue[index] -= step;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        updatedValue[index] += step;
      }

      // Clamp the value within the range
      updatedValue[index] = Math.max(min, Math.min(max, updatedValue[index]));

      // For multiple thumbs, prevent them from crossing each other
      if (index > 0) {
        // Check if the previous thumb value exists
        updatedValue[index] = Math.max(updatedValue[index], (updatedValue[index - 1] || 0) + step);
      }

      if (index < updatedValue.length - 1) {
        // Check if the next thumb value exists
        updatedValue[index] = Math.min(updatedValue[index], (updatedValue[index + 1] || 0) - step);
      }

      // Update state or invoke the onChange callback
      if (isControlled) {
        onChange?.(updatedValue[0] || updatedValue);
      } else {
        // Uncontrolled version: directly update internal state
        setInternalValue(updatedValue);
      }
    },
    [activeValue, max, min, isControlled, onChange, step]
  );

  const onHandleTrackMouseDown: React.MouseEventHandler<HTMLSpanElement> = useCallback(
    (event): void => {
      if (activeValue?.length === 1 && !disabled) {
        onHandleMove(event as unknown as MouseEvent, 0);
      }
    },
    [disabled, activeValue, onHandleMove]
  );

  return (
    <div ref={sliderRef} className={cssClasses.root}>
      <span className={cssClasses.track} onMouseDown={onHandleTrackMouseDown}>
        <span
          className={cssClasses.indicator}
          style={
            {
              "--slider-track-start": `${trackStart}%`,
              "--slider-track-end": `${trackEnd - trackStart}%`
            } as React.CSSProperties
          }
        />
      </span>
      {activeValue.map((val, index) => (
        <button
          key={val}
          className={cssClasses.thumb}
          style={{ "--slider-thumb-percentage": `${valueToPercent(val)}%` } as React.CSSProperties}
          role="slider"
          aria-orientation="horizontal"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={() => onHandleMouseDown(index)}
          onTouchStart={() => onHandleTouchStart(index)}
          onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) =>
            onHandleKeyDown(event, index)
          }
        />
      ))}
    </div>
  );
}
