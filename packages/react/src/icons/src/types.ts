/**
 * Props for an Icon component.
 * @extends {React.SVGAttributes<SVGElement>}
 */
export type IconProps = {
  /** The color of the icon. */
  color?: string;
  /** The size of the icon. */
  size?: string | number;
  /** Additional SVG attributes for the icon. */
} & React.SVGAttributes<SVGElement>;
