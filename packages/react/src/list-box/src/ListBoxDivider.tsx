import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function ListBoxDivider(): React.ReactElement {
  const rootClassName = "list-box__divider";
  const cssClasses = {
    root: classNames(styles[rootClassName]),
  };

  return <hr className={cssClasses.root} />;
}
