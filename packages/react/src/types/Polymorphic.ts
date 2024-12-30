import { forwardRef } from "react";

/**
 * Type that defines a fixed version of `forwardRef`, which takes a render function
 * and returns a component that forwards the ref to a DOM element or another component.
 *
 * @template T - The type of the ref that will be forwarded.
 * @template P - The type of the props for the component.
 *
 * @param render - A function that takes props and a ref and returns a React node.
 * @returns A component that forwards the ref.
 */
export type FixedForwardRef = <T, P = unknown>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

/**
 * Type that omits a property from a union of types (distributively).
 * It behaves similarly to `Omit`, but is applied distributively to union types.
 *
 * @template T - The type to omit properties from.
 * @template TOmitted - The property key to omit from type `T`.
 *
 * @returns A new type that omits the specified property from `T`.
 */
export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

/**
 * A fixed version of `forwardRef` that can handle both props and ref more explicitly.
 * This allows better typing when working with `forwardRef`.
 */
export const fixedForwardRef = forwardRef as FixedForwardRef;
