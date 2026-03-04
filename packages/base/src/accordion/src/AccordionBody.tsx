import React from "react";

/**
 * Props for the `AccordionBody` component.
 * Inherits the standard props of a `div` element, allowing you to pass any props a `div` would accept.
 */
export type AccordionBodyProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Component used to display the body content of an accordion item.
 * It allows any valid `div` props to be passed, such as `className`, `style`, etc.
 *
 * @param props - The props for the `AccordionBody` component.
 * @returns The rendered `AccordionBody` component.
 *
 * @see {@link AccordionBodyProps} for the complete list of props.
 */
export function AccordionBody({ children, ...props }: AccordionBodyProps): React.ReactElement {
  return <div {...props}>{children}</div>;
}
