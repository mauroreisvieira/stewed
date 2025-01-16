import type { JSX, ElementType } from "react";

/**
 * Merges two types, `T` and `U`, by excluding properties from `T` that are present in `U` and then combining them with `U`.
 * This ensures that properties from `U` override those from `T` if they share the same key.
 *
 * @template T - The first type to merge.
 * @template U - The second type to merge.
 * @returns A new type that combines `T` and `U`, with `U`'s properties overriding `T`'s.
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Represents the intrinsic attributes for a given element type.
 *
 * This type combines the intrinsic attributes of a `JSX` element or a `React`
 * component constructor with the props that can be passed to it.
 *
 * @template E - The type of the element, which can be a key of JSX.IntrinsicElements or a React component constructor.
 */
export type IntrinsicAttributes<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

/**
 * Combines custom props with intrinsic attributes for a flexible component.
 *
 * This type allows a component to accept both its own props and the intrinsic attributes of the element it renders as.
 * It omits any keys from the intrinsic attributes that are already defined in the custom props to avoid conflicts.
 *
 * @template I - The type of the custom props for the component.
 * @template E - The type of the element that the component can render as.
 */
export type CombinedProps<I, E extends ElementType> = I & Omit<IntrinsicAttributes<E>, keyof I>;
