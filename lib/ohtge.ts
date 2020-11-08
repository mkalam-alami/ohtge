import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import './ohtge.css';

export type InputCallback = (input: string | undefined) => void | Promise<void>;

// Styles

var styles: Record<string, { open: string; close: string; }> = {};

const styleCodes: Record<string, [number, number]> = {
    reset: [0, 0],

    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],

    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49]
}

Object.keys(styleCodes).forEach(function (key) {
    const val = styleCodes[key];
    styles[key] = {
        open: '\u001b[' + val[0] + 'm',
        close: '\u001b[' + val[1] + 'm'
    };
})

// Terminal init
// https://xtermjs.org/docs/api/terminal/classes/terminal/

var term = new Terminal({
    cols: 80,
    rows: 20,
    cursorBlink: true,
    cursorStyle: "underline",
    fontFamily: "monospace",
    fontWeight: "bold"
});


term.open(document.getElementsByClassName('ohtge-terminal')[0] as HTMLElement);
(document.getElementsByClassName('terminal')[0] as HTMLElement).focus()
setTimeout(function () {
    var windowEl = document.getElementsByClassName('ohtge-window')[0]!
    windowEl.setAttribute('style', 'width: ' +
        (document.getElementsByClassName('xterm-screen')[0].clientWidth + 15) + 'px')
    windowEl.classList.remove('cloaked')
})
colorFn("bold");

// State

let cursorX = 0;
let promptCallback: InputCallback | undefined = undefined;
let promptResolve: Function | undefined = undefined;
let promptData = '';
let isPause = false;
let isEnd = false;

// I/O & functions

term.onKey((e: { key: string, domEvent: KeyboardEvent }) => {
    const { key, domEvent: ev } = e;

    if (isEnd) {
        return
    }

    var printable = !ev.altKey && !(ev as any).altGraphKey && !ev.ctrlKey && !ev.metaKey
    if (ev.keyCode == 13) {
        if (promptData || isPause) {
            if (!isPause) {
                term.write('\r\n')
            }
            
            if (promptResolve) {
                promptResolve(isPause ? undefined : promptData);
                promptResolve = undefined;
            }

            if (promptCallback) {
                var callback = promptCallback
                var wasPause = isPause
                promptCallback = undefined
                isPause = false
                setTimeout(function () {
                    callback(wasPause ? undefined : promptData);
                });
            } else {
                inputFn('?')
            }
        }
    } else if (ev.keyCode == 8) {
        if (cursorX > 0) {
            cursorX--
            term.write('\b \b')
            promptData = promptData.slice(0, promptData.length - 1)
        }
    } else if (printable) {
        if (promptResolve) {
            promptData += key
        }
        term.write(key)
        cursorX++
    }
});

function writeFn(text?: string) {
    term.writeln(text !== undefined ? text : "");
}

function pauseFn(callback?: InputCallback) {
    promptData = '';
    promptCallback = callback;
    isPause = true;
    cursorX = 0;
    return new Promise((resolve, _reject) => {
        promptResolve = resolve;
    })
}

function inputFn(textOrCallback: string | InputCallback, callback?: InputCallback): Promise<string> {
    let text = textOrCallback;
    if (typeof textOrCallback === 'function') {
        text = ''
        callback = textOrCallback;
    }

    promptData = '';
    promptCallback = callback;
    term.write((text || '') + ' ');
    cursorX = 0;

    return new Promise((resolve, _reject) => {
        promptResolve = resolve;
    })
}

function clearFn() {
    // Requires to be called in a separate tick then the text to clear
    term.clear();
}

function colorFn(colorCode: string) {
    if (typeof colorCode === 'string') {
        term.write(styles[colorCode].open)
    } else {
        term.write(colorCode)
    }
}

function endFn() {
    isEnd = true
}

function titleFn(title: string) {
    if (document.getElementsByTagName('title').length === 0) {
        var titleEl = document.createElement('title')
        document.getElementsByTagName('head')[0].appendChild(titleEl)
    }
    var titleTagEls = document.getElementsByTagName('title');
    
    for (let index = 0; index < titleTagEls.length; index++) {
        titleTagEls.item(index)!.innerText = title
    }

    var titleIdEl = document.getElementsByClassName('ohtge-title')[0] as HTMLElement;
    if (titleIdEl) {
        titleIdEl.innerText = title;
    }
}

function resizeFn(rows: number, cols: number) {
    term.resize(rows, cols)
}

const global = globalThis as any;
global.write = writeFn;
global.pause = pauseFn;
global.input = inputFn;
global.clear = clearFn;
global.color = colorFn;
global.end = endFn;
global.title = titleFn;
global.resize = resizeFn;


/**
 * Writes a line of text on the screen.
 */
export const write = writeFn;

/**
 * Pauses the execution until the user presses Enter.
 */
export const pause = pauseFn;

/**
 * Pauses the execution until the user writes input text and presses Enter.
 * The input is passed as the callback first argument.
 */
export const input = inputFn;

/**
 * Clears the screen.
 */
export const clear = clearFn;

/**
 * Sets the current text color, to be applied in all future `print` and `input` commands.
 */
export const color = colorFn;

/**
 * Ends the program.
 */
export const end = endFn;

/**
 * Changes the title of both the browser tab and the fake terminal. 
 */
export const title = titleFn;

/**
 * Resizes the fake terminal.
 */
export const resize = resizeFn;

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
