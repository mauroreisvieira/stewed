import React from "react";
// UI Components
import { Text } from "../../typography";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldErrorProps {
  /** Boolean indicating whether the form field error should be hidden. */
  hidden?: boolean;
  /** Custom class name for the form field error. */
  className?: string;
  /** The children nodes to be rendered within the form field error. */
  children: React.ReactNode;
}

export function FormFieldError({
  hidden,
  className,
  children,
}: FormFieldErrorProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.FormField}__error`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className, modifiers: [hidden && "hidden"] }),
  };

  return (
    <Text as="span" size="xs" skin="critical" className={cssClasses.root} aria-live="polite">
      {children}
    </Text>
  );
}
