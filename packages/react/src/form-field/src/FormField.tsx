import React from "react";
// Compound Component
import { FormFieldLabel } from "./FormFieldLabel";
import { FormFieldControl } from "./FormFieldControl";
import { FormFieldDescription } from "./FormFieldDescription";
import { FormFieldError } from "./FormFieldError";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldProps {
  children: React.ReactNode;
}

export function FormField({ children }: FormFieldProps): React.ReactElement {
  const rootName = "form-field";
  const cssClasses = {
    root: classNames(styles[rootName]),
  };

  return <div className={cssClasses.root}>{children}</div>;
}

// Compound component composition
FormField.Label = FormFieldLabel;
FormField.Control = FormFieldControl;
FormField.Description = FormFieldDescription;
FormField.Error = FormFieldError;
