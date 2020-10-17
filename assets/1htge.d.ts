type StyleCode =
  "reset" |
  "bold" |
  "dim" |
  "italic" |
  "underline" |
  "inverse" |
  "hidden" |
  "strikethrough" |

  "black" |
  "red" |
  "green" |
  "yellow" |
  "blue" |
  "magenta" |
  "cyan" |
  "white" |
  "gray" |
  "grey" |

  "bgBlack" |
  "bgRed" |
  "bgGreen" |
  "bgYellow" |
  "bgBlue" |
  "bgMagenta" |
  "bgCyan" |
  "bgWhite";


/**
 * Prints a message to the screen.
 */
declare const print: (message?: string) => void

/**
 * Pauses the execution until the user presses Enter.
 */
declare const pause: (callback: () => void) => void

/**
 * Pauses the execution until the user writes input text and presses Enter.
 * The input is passed as the callback first argument.
 */
declare const input: (message: string, callback: (input: string) => void) => void

/**
 * Clears the screen.
 */
declare const clear: () => void

/**
 * Sets the current text color, to be applied in all future `print` and `input` commands.
 */
declare const color: (code: StyleCode) => void

/**
 * Ends the program.
 */
declare const end: () => void

/**
 * Changes the title of both the browser tab and the fake terminal. 
 */
declare const title: (title: string) => void

/**
 * Changes the legend displayed below the fake terminal.
 */
declare const legend: (legend: string) => void

/**
 * Resizes the fake terminal.
 */
declare const resize: (rows: number, cols: number) => void
