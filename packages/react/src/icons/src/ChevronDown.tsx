import React from "react";
// Types
import type { IconProps } from "./types";

export const ChevronDown: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      height={size}
      width={size}
      stroke={color}
      {...attributes}
    >
<path d="m6 9 6 6 6-6" />
    </svg>
  );
};