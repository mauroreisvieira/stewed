import React from "react";
// UI Components
import { Text } from "../../typography";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldLabelProps {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export function FormFieldLabel({ className, ...props }: FormFieldLabelProps): React.ReactElement {
  const rootName = "form-field__label";
  const cssClasses = {
    root: classNames(styles[rootName]),
    className,
  };

  return <Text as="label" size="sm" className={cssClasses.root} {...props} />;
}
