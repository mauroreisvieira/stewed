import React from "react";
// Types
import type { IconProps } from "../../types";

export const HorizontalRule: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      stroke={color}
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      {...attributes}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path fillRule="evenodd" d="M4 11h16v2H4z" />
    </svg>
  );
};
