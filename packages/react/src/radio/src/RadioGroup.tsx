import React from "react";
// Context
import { RadioGroupContext, type RadioGroupContextProps } from "./RadioGroupContext";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export interface RadioGroupProps
  extends React.ComponentPropsWithRef<"div">,
    RadioGroupContextProps {
  /**
   * Specifies the orientation of the radio group.
   * @default horizontal
   */
  orientation?: "vertical" | "horizontal";
  /** Sets the radio group to use the full width of its container. */
  fullWidth?: boolean;
}

/**
 * Use radio group to allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
 *
 * @example
 * ```tsx
 * <Radio.Group checkedValue={values} onCheckedChange={handleSetCheckedValues}>
 *   <Radio name="Red">Red</Radio>
 *   <Radio name="Blue">Blue</Radio>
 * <Radio.Group>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLDIvElement>.
 *
 * @param {RadioGroupProps} props - The props for the Radio Group component.
 * @returns {React.ReactElement} - The rendered Radio component.
 */
export function RadioGroup({
  name,
  checkedValue,
  onCheckedChange,
  orientation = "horizontal",
  fullWidth,
  className,
  children,
  ...props
}: RadioGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Radio}__group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [orientation, fullWidth && "full-width"],
      extraClasses: className,
    }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      <RadioGroupContext value={{ name, checkedValue, onCheckedChange }}>
        {children}
      </RadioGroupContext>
    </div>
  );
}
