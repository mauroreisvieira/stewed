import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSelected?: string;
  gap?: boolean;
}

export function ToggleGroup({
  defaultSelected,
  className,
  children,
}: ToggleGroupProps): React.ReactElement {
  const rootClassName = "toggle__group";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      className,
    ),
  };
  console.log("defaultSelected", defaultSelected);
  return <div className={cssClasses.root}>{children}</div>;
}
