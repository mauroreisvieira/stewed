/*
 * Used to convert a list of properties in a type from optional to required.
 *
 * @example:
 * ```ts`
 *  type Data = {
 *    description?: string
 *    id?: string
 *    label?: string
 *    value: string
 *  };
 *  type DataWithRequiredIdAndLabel = MandateProps<Data, 'id' | 'label'>;
 *  ```
 */
export type Mandatory<T, K extends keyof T> = Omit<T, K> & {
  [MK in K]-?: NonNullable<T[MK]>;
};
