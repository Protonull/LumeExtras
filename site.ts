import { AdvancedPage, BasicPage } from "./page.ts";

/**
 * Please ensure that each "url" property is 'absolute' (starts with a '/').
 * Since this leverages multi-page generators, any relative url
 * (eg: "example.html" "../other.html") will behave differently depending on
 * where you put your "generatePages()" call.
 */
export const pages: Array<BasicPage | AdvancedPage> = [];

/**
 * Lume doesn't have a means of generating pages on the fly. This is a
 * workaround that leverages multi-page generators. Be aware that this'll be
 * immune from the file-watcher that auto-refreshes pages. These should be
 * strictly programmatic pages.
 * @example
 * // _config.ts
 * import { pages } from "extras/pages.ts";
 * pages.push({ url: "/CNAME", content: "example.com" });
 * 
 * // [pages].tmpl.ts
 * import { generatePages } from "extras/site.ts";
 * export default generatePages();
 */
export function generatePages() {
    return async function* () {
        yield* pages;
    }
}
