import React, { useMemo } from "react";
// Context
import { StepperContext, type StepperContextProps } from "./StepperContext";
// Compound Component
import { StepperItem, type StepperItemProps } from "./StepperItem";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Properties for the Stepper component.
 *
 * @extends {React.ComponentPropsWithoutRef<"div">} - Inherits all div element props
 * @extends {Omit<StepperContextProps, "steps">} - Inherits Stepper context props except 'steps'
 */
export interface StepperProps
  extends React.ComponentPropsWithoutRef<"div">,
    Omit<StepperContextProps, "steps"> {
  /**
   * The direction of the stepper.
   * @default row
   */
  direction?: "row" | "column";
}

/**
 * Stepper is used to indicate the user's progress through a multi-step process.
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param props - The props for the Stepper component.
 * @returns The rendered Stepper component.
 *
 * @see {@link StepperProps} for the complete list of props.
 *
 * @example
 * ```tsx
 * <Stepper selectedValue={"3"}>
 *   <Stepper.Item value="1" title="Step 1" completed />
 *   <Stepper.Item value="2" title="Step 2" />
 *   <Stepper.Item value="3" title="Step 3" />
 * </Stepper>
 * ```
 */
export function Stepper({
  selectedValue,
  direction = "row",
  className,
  children,
  ...props
}: StepperProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({
    block: components.Stepper,
    styles
  });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [direction],
      extraClasses: className
    }),
    connecter: getElement(["connecter"])
  };

  // Array of valid child components to optimize performance.
  // Filters out any non-element children and ensures each child is a valid React element of type StepperItemProps.
  const childArray = useMemo(
    () =>
      React.Children.toArray(children).filter((child) =>
        React.isValidElement<StepperItemProps>(child)
      ),
    [children]
  );

  // Array of step values derived from each valid child component's 'value' prop.
  // This creates an array of steps with a consistent structure, optimizing re-renders.
  const steps = useMemo(() => childArray.map(({ props: { value } }) => ({ value })), [childArray]);

  return (
    <div className={cssClasses.root} {...props}>
      <StepperContext value={{ selectedValue, steps }}>
        {childArray.map((child, index) => (
          <React.Fragment key={child.props.value}>
            {child}
            {index < childArray.length - 1 && (
              <span role="separator" className={cssClasses.connecter} />
            )}
          </React.Fragment>
        ))}
      </StepperContext>
    </div>
  );
}

// Compound component composition
Stepper.Item = StepperItem;
