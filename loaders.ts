import { read } from "lume/core/utils.ts";
import { Data } from "lume/core/filesystem.ts";
import greymatter from "npm:gray-matter@4.0.3";

/**
 * Lume's frontmatter parse is *really* wimpy and silently fails with large
 * documents. This uses NPM's gray-matter instead, which I've never found
 * fault with, 10/10 would recommend.
 */
export async function textLoader(path: string): Promise<Data> {
    const matter = greymatter(await read(path, false));
    matter.data.content = matter.content;
    return matter.data;
}