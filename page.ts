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
 * Page generator wrapper that gives some helper functions.
 * @summary Added due to a bug in Lume's page generation where, in an example multi-page generator at "/example/page.tmpl.ts" that returns a page-url of "./test.html", the resulting page will be rendered at "/example/example/test.html".
 * @example
 * export default generatePages(async function* ({ yieldBasicPage }) {
 *     yield yieldBasicPage("/CNAME", "example.com");
 * });
 */
export function generatePages(fn: (fns: {
    /**
     * Resolves a given page path in relation to the generator, or as-is if the path starts with /
     * @example
     * // /example/page.tmpl.ts
     * resolvePagePath("/CNAME")        // = /CNAME
     * resolvePagePath("testing.html")  // = /example/testing.html
     * resolvePagePath("../index.html") // = /index.html
     */
    resolvePagePath(path: string): string,
    /**
     * @param path The destination-path for this page which will be resolved with resolvePagePath.
     * @example
     * yieldBasicPage("/CNAME", "example.com")
     * yieldBasicPage("example.html", "test")
     */
    yieldBasicPage(path: string, content: Suggestion<Content>): BasicPage,
    /**
     * @param page The url property will be resolved with resolvePagePath.
     * @example
     * yieldAdvancedPage({
     *     url: "example.html",
     *     layout: "layouts/example.ts",
     *     body: "Hello, World!"
     * })
     */
    yieldAdvancedPage(page: AdvancedPage): AdvancedPage,
    data: Data,
    helpers: Helpers,
}) => ReturnType<PageGenerator>): PageGenerator {
    return async function* (data, helpers) {
        function resolvePagePath(path) {
            return path.startsWith("/") ? path : std_path.resolve(std_path.dirname(data?.page?.src?.path ?? "/"), path);
        }
        yield* fn({
            resolvePagePath,
            yieldBasicPage(path, content) {
                return { url: resolvePagePath(path), content };
            },
            yieldAdvancedPage(page) {
                page.url = resolvePagePath(page.url);
                return page;
            },
            data,
            helpers
        });
    }
}
