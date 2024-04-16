/**
 * Returns an array of strings representing all the enumerable properties of the given object.
 *
 * @param o The object whose enumerable properties are to be returned.
 * @returns An array of strings representing the enumerable properties of the object.
 * @template Obj The type of the object.
 */
export const objectKeys: <Obj>(o: Obj) => (keyof Obj)[] = Object.keys;
