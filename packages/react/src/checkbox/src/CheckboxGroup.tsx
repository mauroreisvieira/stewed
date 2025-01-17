import React from "react";
// Context
import { CheckboxGroupContext, type CheckboxGroupContextProps } from "./CheckboxGroupContext";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the CheckboxGroup component.
 * Extends the standard div element props and includes context properties for managing checkbox states.
 */
export interface CheckboxGroupProps
  extends React.ComponentPropsWithoutRef<"div">,
    CheckboxGroupContextProps {
  /**
   * Specifies the orientation of the checkbox group.
   * @default horizontal
   */
  orientation?: "vertical" | "horizontal";
  /** Sets the checkbox group to use the full width of its container. */
  fullWidth?: boolean;
}

/**
 * Use checkbox group to allow users to select multiple items from a list of individual items,
 * or to mark one individual item as selected.
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLDIvElement>.
 *
 * @param {CheckboxGroupProps} props - The props for the Checkbox Group component.
 * @returns {React.ReactElement} - The rendered Checkbox component.
 *
 * @example
 * ```tsx
 * <Checkbox.Group checkedValues={values} onCheckedChange={handleSetCheckedValues}>
 *   <Checkbox name="Red">Red</Checkbox>
 *   <Checkbox name="Blue">Blue</Checkbox>
 * <Checkbox.Group>
 * ```
 */
export function CheckboxGroup({
  checkedValues,
  onCheckedChange,
  orientation = "horizontal",
  fullWidth,
  className,
  children,
  ...props
}: CheckboxGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Checkbox}__group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [orientation, fullWidth && "full-width"],
      extraClasses: className
    })
  };

  return (
    <div className={cssClasses.root} aria-orientation={orientation} {...props}>
      <CheckboxGroupContext value={{ checkedValues, onCheckedChange }}>
        {children}
      </CheckboxGroupContext>
    </div>
  );
}
