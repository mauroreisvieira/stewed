import { forwardRef } from "react";

// Added fixedForwardRef from a previous exercise
export type FixedForwardRef = <T, P = unknown>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

// Added a DistributiveOmit type
export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export const fixedForwardRef = forwardRef as FixedForwardRef;
