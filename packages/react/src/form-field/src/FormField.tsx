import React from "react";
// Compound Component
import { FormFieldLabel } from "./FormFieldLabel";
import { FormFieldControl } from "./FormFieldControl";
import { FormFieldDescription } from "./FormFieldDescription";
import { FormFieldError } from "./FormFieldError";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldProps {
  /** Custom class name for the form field. */
  className?: string;
  /** The children nodes to be rendered within the form field. */
  children: React.ReactNode;
}

export function FormField({ className, children }: FormFieldProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.FormField, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return <div className={cssClasses.root}>{children}</div>;
}

// Compound component composition
FormField.Label = FormFieldLabel;
FormField.Control = FormFieldControl;
FormField.Description = FormFieldDescription;
FormField.Error = FormFieldError;
