import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

type TagType = React.HTMLAttributes<HTMLSpanElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface TagProps extends TagType {
  skin?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
}

export function Tag({
  skin = "primary",
  size = "md",
  className,
  children,
  ...otherProps
}: TagProps): React.ReactElement {
  const { href } = otherProps;
  const Tag = href ? "a" : "span";
  const rootClassName = "tag";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      styles[`${rootClassName}--${skin}`],
      styles[`${rootClassName}--${size}`],
      className,
    ),
  };

  return (
    <Tag className={cssClasses.root} href={href} {...otherProps}>
      {children}
    </Tag>
  );
}