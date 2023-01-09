import { Content, Data } from "lume/core/filesystem.ts";
import { ModuleEngine } from "lume/plugins/modules.ts";
import { Suggestion } from "./basics.ts";

/**
 * Type for the helper functions provided by plugins given to pages and layouts.
 */
export type Helpers = typeof ModuleEngine.prototype.helpers;

/**
 * Type for a basic return from a multi-page generator.
 * @see {@link https://lume.land/docs/core/multiple-pages/#basic-example}
 */
export type BasicPage = {
    url: string,
    content: Suggestion<Content>
};

/**
 * Type for a page with that supports an individual layout and page data.
 * @see {@link https://lume.land/docs/core/multiple-pages/#multiple-pages-with-layouts}
 */
export type AdvancedPage = {
    url: string,
    layout?: string,
    body: Suggestion<string>,
    // deno-lint-ignore no-explicit-any
    [key: string]: any
};

/**
 * This applies to page default-functions and generators, but also layout default-functions
 */
export type PageParameters = [data: Data, helpers: Helpers];

/**
 * Helper type for page default-functions
 * @example
 * export default ((data, helpers) => "Hello World") as PageDefault;
 */
export type PageDefault = (...args: PageParameters) => Suggestion<Content>;

/**
 * Helper type for page default-generators
 * @example
 * export default (async function* (data, helpers) {
 *     yield {
 *         url: "/test.html",
 *         content: "Hello, World!"
 *     };
 * }) as PageGenerator;
 */
export type PageGenerator = (...args: PageParameters) => AsyncGenerator<BasicPage | AdvancedPage>;
