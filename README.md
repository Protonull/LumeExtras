# LumeExtras

Here be a series of utilities to aid in your [Lume](https://lume.land/) adventures.

## Usage

```json5
// import_map.json
{
    "imports": {
        "extras/": "https://deno.land/x/lume_extras@v0.0.2/"
    }
}
```
```ts
// _config.ts
import { pages } from "extras/pages.ts";
pages.push({
    url: "/CNAME",
    content: "example.com"
});

// [pages].tmpl.ts
import { generatePages } from "extras/site.ts";
export default generatePages;
```