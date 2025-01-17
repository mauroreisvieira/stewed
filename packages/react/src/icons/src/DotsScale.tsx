import React from "react";
// Types
import type { IconProps } from "./types";

/**
 * A DotsScale icon component.
 *
 * @param props - The properties for the DotsScale icon component.
 * @returns A React element representing the DotsScale icon.
 */
export const DotsScale: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      height={size}
      width={size}
      {...attributes}
    >
      <circle cx="24" cy="4" r="4" />
      <circle cx="12.19" cy="7.86" r="3.7" />
      <circle cx="5.02" cy="17.68" r="3.4" />
      <circle cx="5.02" cy="30.32" r="3.1" />
      <circle cx="12.19" cy="40.14" r="2.8" />
      <circle cx="24" cy="44" r="2.5" />
      <circle cx="35.81" cy="40.14" r="2.2" />
      <circle cx="42.98" cy="30.32" r="1.9" />
      <circle cx="42.98" cy="17.68" r="1.6" />
      <circle cx="35.81" cy="7.86" r="1.3" />
    </svg>
  );
};
