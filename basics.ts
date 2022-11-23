/**
 * Reliable function determining whether a value exists.
 * @example
 * const value = 0;
 * if (value)         // false
 * if (exists(value)) // true
 */
export function exists(thing: unknown): boolean {
    return (thing ?? null) !== null;
}

/**
 * Type for a string, or an object that can be stringified.
 */
export type Stringlike = string | { toString(): string; };

/**
 * Jokey jokey name for a type that could be a type, or a promise of a type.
 */
export type Suggestion<T> = T | Promise<T>;

/**
 * Hacky way of getting type highlighting.
 * @example
 * import { UnitaryReturn } from "extras/basics.ts";
 * import { PageDefault } from "extras/page.ts";
 * 
 * export default UnitaryReturn<PageDefault>(async (data, helper) => "Hello, World!");
 */
export function UnitaryReturn<T>(arg: T): T {
    return arg;
}
