import React from "react";
// Types
import type { IconProps } from "./types";

/**
 * A ChevronRight icon component.
 *
 * @param props - The properties for the ChevronRight icon component.
 * @returns A React element representing the ChevronRight icon.
 */
export const ChevronRight: React.FC<IconProps> = ({
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
};
