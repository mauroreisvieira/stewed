import React from "react";
// Types
import type { IconProps } from "./types";

export const Check: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 20 20"
      strokeWidth={0}
      height={size}
      width={size}
      {...attributes}>
      <path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z" />
    </svg>
  );
};
