import { Content, Data } from "lume/core/filesystem.ts";
import { ModuleEngine } from "lume/plugins/modules.ts";
import * as std_path from "std/path/mod.ts";
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

/**
 * Resolves a given page path in relation to the generator, or as-is if the path starts with /
 * 
 * @param data The data parameter passed through from the multi-page generator.
 * @param path The intended destination for the page, which should include the extension, if relevant.
 * 
 * @example
 * // file: /example/page.tmpl.ts
 * getPageURL("/CNAME")        // = /CNAME
 * getPageURL("testing.html")  // = /example/testing.html
 * getPageURL("../index.html") // = /index.html
 */
export function getPageURL(data: Data, path: string): string {
    return path.startsWith("/") ? path : std_path.resolve(std_path.dirname(data?.page?.src?.path ?? "/"), path);
}
