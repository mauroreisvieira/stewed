import React from "react";
// UI Components
import { Text } from "../../typography";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldErrorProps {
  className?: string;
  children: React.ReactNode;
}

export function FormFieldError({ className, children }: FormFieldErrorProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.FormField}__error`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <Text as="span" size="xs" skin="critical" className={cssClasses.root} aria-live="polite">
      {children}
    </Text>
  );
}
