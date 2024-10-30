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

export interface StepperProps
  extends React.ComponentPropsWithoutRef<"div">,
    Omit<StepperContextProps, "steps"> {}

export function Stepper({
  selectedValue,
  className,
  children,
  ...props
}: StepperProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Stepper, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
    connecter: getElement(["connecter"]),
  };

  const childArray = useMemo(
    () =>
      React.Children.toArray(children).filter((child) =>
        React.isValidElement<StepperItemProps>(child),
      ),
    [children],
  );

  const steps = useMemo(() => childArray.map(({ props: { value } }) => ({ value })), [childArray]);

  return (
    <div className={cssClasses.root} {...props}>
      <StepperContext.Provider value={{ selectedValue, steps }}>
        {childArray.map((child, index) => (
          <React.Fragment key={child.props.value}>
            {child}
            {index < childArray.length - 1 && (
              <span role="separator" className={cssClasses.connecter} />
            )}
          </React.Fragment>
        ))}
      </StepperContext.Provider>
    </div>
  );
}

// Compound component composition
Stepper.Item = StepperItem;
