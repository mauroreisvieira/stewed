import React from "react";
// Types
import type { IconProps } from "./types";

/**
 * A Cross icon component.
 *
 * @param props - The properties for the Cross icon component.
 * @returns A React element representing the Cross icon.
 */
export const Cross: React.FC<IconProps> = ({
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
};
