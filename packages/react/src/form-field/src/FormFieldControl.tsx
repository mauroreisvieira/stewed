import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldControlProps {
  className?: string;
  children: React.ReactNode;
}

export function FormFieldControl({ className, ...props }: FormFieldControlProps): React.ReactElement {
  const rootName = "form-field__control";
  const cssClasses = {
    root: classNames(styles[rootName]),
    className,
  };

  return <div role="presentation" className={cssClasses.root} {...props} />;
}
