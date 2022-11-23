import { AdvancedPage, BasicPage } from "./page.ts";
import { Content, Site } from "lume/core.ts";
import { Suggestion } from "./basics.ts";

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

/**
 * Lume separates these calls, presumably so you can process the file, but if
 * you just want to copy-paste a remote file as-is, this can help.
 */
export function copyRemoteFile(
    site: Site,
    filename: string,
    url: string
) {
    site.remoteFile(filename, url);
    site.copy(filename);
}

/**
 * This allows you to transform a remote file before it's saved. Be aware that
 * this uses the custom page-generation method over Lume's first-party methods.
 */
export function transformRemoteFile(
    filename: string,
    url: string,
    transformer: (response: Response) => Suggestion<Content>
): Promise<void> {
    return fetch(url)
        .then((res) => transformer(res))
        .then((content) => { pages.push({ url: filename, content }) });
}
