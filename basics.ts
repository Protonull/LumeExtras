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

import { type JSONValue } from "std/encoding/jsonc.ts";
/** Alias for JSONValue to not necessitate another import */
export type JSONAny = JSONValue;
/** Isolated JSON-object type. */
export type JSONObject = { [key: string]: JSONValue | undefined };
/** Isolated JSON-array type. */
export type JSONArray = JSONValue[];

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

/**
 * Attempts to parse a date from a given value. Date objects will be returned
 * as is. Strings will be interpreted as date strings (such as 
 * "Wed Aug 05 2020 14:19:27"). Numbers will be interpreted as timestamps.
 * 
 * @return Returns a valid date instance, or null.
 */
 export function parseDate(value: unknown): Date | null {
    if (value instanceof Date) {
        if (!isNaN(value.getTime())) {
            return value;
        }
    }
    else if (typeof value === "string" || typeof value === "number") {
        return parseDate(new Date(value));
    }
    return null;
}
