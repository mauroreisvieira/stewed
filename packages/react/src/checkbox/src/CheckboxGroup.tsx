import React from "react";
import { CheckboxGroupProvider, type CheckboxGroupProviderProps } from "./CheckboxGroupProvider";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export interface CheckboxGroupProps
  extends React.ComponentPropsWithRef<"div">,
    CheckboxGroupProviderProps {
  /**
   * Specifies the orientation of the checkbox group.
   * @default horizontal
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * Use checkbox group to allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
 *
 * @example
 * ```tsx
 * <Checkbox.Group checkedValues={values} onCheckedChange={handleSetCheckedValues}>
 *   <Checkbox name="Red">Red</Checkbox>
 *   <Checkbox name="Blue">Blue</Checkbox>
 * <Checkbox.Group>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLDIvElement>.
 *
 * @param {CheckboxGroupProps} props - The props for the Checkbox Group component.
 * @returns {React.ReactElement} - The rendered Checkbox component.
 */
export function CheckboxGroup({
  checkedValues,
  onCheckedChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: CheckboxGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Checkbox}__group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [orientation],
      extraClasses: className,
    }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      <CheckboxGroupProvider checkedValues={checkedValues} onCheckedChange={onCheckedChange}>
        {children}
      </CheckboxGroupProvider>
    </div>
  );
}
