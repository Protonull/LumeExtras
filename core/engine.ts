import type { Data, Engine as IEngine, Helper, HelperOptions } from "lume/core.ts";
import type { Stringable } from "../mod.ts";

export default abstract class Engine<T extends Stringable> implements IEngine {

    /**
     * @override
     */
    abstract addHelper(
        name: string,
        fn: Helper,
        options: HelperOptions
    ): void;

    /**
     * @override
     */
    abstract deleteCache(
        file: string
    ): void;

    /**
     * @async
     * @override
     */
    abstract render(
        content: unknown,
        data?: Data,
        filename?: string
    ): Promise<T>;

    /**
     * @deprecated
     * @override
     */
    renderSync(
        content: unknown,
        data?: Data,
        filename?: string
    ): string {
        return this.renderComponent(content, data, filename) as unknown as string;
    }

    /**
     * Render a Lume component
     * 
     * @see https://lume.land/docs/core/components/
     */
    abstract renderComponent(
        content: unknown,
        data?: Data,
        filename?: string
    ): T;

}