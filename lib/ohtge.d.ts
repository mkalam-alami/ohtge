import 'xterm/css/xterm.css';
import './ohtge.css';
export declare type InputCallback = (input: string | undefined) => void | Promise<void>;
declare function writeFn(text?: string): void;
declare function pauseFn(callback?: InputCallback): Promise<unknown>;
declare function inputFn(textOrCallback: string | InputCallback, callback?: InputCallback): Promise<string>;
declare function clearFn(): void;
declare function colorFn(colorCode: string): void;
declare function endFn(): void;
declare function titleFn(title: string): void;
declare function resizeFn(rows: number, cols: number): void;
/**
 * Writes a line of text on the screen.
 */
export declare const write: typeof writeFn;
/**
 * Pauses the execution until the user presses Enter.
 */
export declare const pause: typeof pauseFn;
/**
 * Pauses the execution until the user writes input text and presses Enter.
 * The input is passed as the callback first argument.
 */
export declare const input: typeof inputFn;
/**
 * Clears the screen.
 */
export declare const clear: typeof clearFn;
/**
 * Sets the current text color, to be applied in all future `print` and `input` commands.
 */
export declare const color: typeof colorFn;
/**
 * Ends the program.
 */
export declare const end: typeof endFn;
/**
 * Changes the title of both the browser tab and the fake terminal.
 */
export declare const title: typeof titleFn;
/**
 * Resizes the fake terminal.
 */
export declare const resize: typeof resizeFn;
declare global {
    /**
     * Writes a line of text on the screen.
     */
    export const write: (text?: string) => void;
    /**
     * Pauses the execution until the user presses Enter.
     */
    export const pause: (callback?: InputCallback) => Promise<void>;
    /**
     * Pauses the execution until the user writes input text and presses Enter.
     * The input is passed as the callback first argument.
     */
    export const input: (textOrCallback: string | InputCallback, callback?: InputCallback) => Promise<string>;
    /**
     * Clears the screen.
     */
    export const clear: () => void;
    /**
     * Sets the current text color, to be applied in all future `print` and `input` commands.
     */
    export const color: (colorCode: string) => void;
    /**
     * Ends the program.
     */
    export const end: () => void;
    /**
     * Changes the title of both the browser tab and the fake terminal.
     */
    export const title: (title: string) => void;
    /**
     * Resizes the fake terminal.
     */
    export const resize: typeof resizeFn;
}
export {};
