import React, { useMemo } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
import { useStepper } from "./StepperContext";
// Tokens
import { components } from "@stewed/tokens";
// UI Components
import { Icon } from "../../index";
// Styles
import styles from "./styles/index.module.scss";

export interface StepperItemProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Unique identifier or label for the stepper item. */
  value: string;
  title?: string;
  /** Optional icon to display alongside the step's label. */
  icon?: React.ReactNode;
  /**
   * Indicates if the step is completed.
   * @default false
   */
  completed?: boolean;
}

export function StepperItem({
  value,
  title,
  completed,
  icon,
  className,
  children,
  ...props
}: StepperItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Stepper}__item`, styles });

  // Use the custom hook useStepper to access all steps and selected value
  const { selectedValue, steps } = useStepper();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [value === selectedValue && "selected", completed && "completed"],
      extraClasses: className,
    }),
    step: getElement(["step"]),
    title: getElement(["title"]),
    content: getElement(["content"]),
  };

  const stepIndex = useMemo(
    () => steps?.findIndex((step) => step.value === value) ?? 0,
    [steps, value],
  );

  return (
    <div className={cssClasses.root} {...props}>
      <span className={cssClasses.step}>
        {completed ? <Icon.Check size={24} /> : icon || stepIndex + 1}
      </span>
      {title && <p className={cssClasses.title}>{title}</p>}
      {children && <span className={cssClasses.content}>{children}</span>}
    </div>
  );
}
