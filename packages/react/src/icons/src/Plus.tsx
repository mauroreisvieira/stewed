import React from "react";
// Types
import type { IconProps } from "./types";

/**
 * A Plus icon component.
 *
 * @param props - The properties for the Plus icon component.
 * @returns A React element representing the Plus icon.
 */
export const Plus: React.FC<IconProps> = ({
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
      {...attributes}
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v14m-7-7h14"
      />
    </svg>
  );
};
