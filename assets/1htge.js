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

term.open(document.getElementById('terminal'))
document.getElementsByClassName('terminal')[0].focus()
setTimeout(function () {
    document.getElementById('window').setAttribute('style', 'width: ' +
        (document.getElementsByClassName('xterm-screen')[0].clientWidth + 15) + 'px')
})

// Styles

var styles = {}
var styleCodes = {
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
};

Object.keys(styleCodes).forEach(function (key) {
    var val = styleCodes[key];
    var style = styles[key] = [];
    style.open = '\u001b[' + val[0] + 'm';
    style.close = '\u001b[' + val[1] + 'm';
});

// State

var cursorX = 0
var currentColor = 'white'
var promptCallback = null
var promptData = ''
var isPause = false
var isEnd = false

// I/O & functions

term.addDisposableListener('key', function (key, ev) {
    if (isEnd) {
        return
    }

    var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
    if (ev.keyCode == 13) {
        if (promptData || isPause) {
            term.write('\r\n')
            if (promptCallback) {
                var callback = promptCallback
                var wasPause = isPause
                promptCallback = null
                isPause = false
                setTimeout(function () {
                    callback(wasPause ? undefined : promptData)
                })
            } else {
                input('?')
            }
        }
    } else if (ev.keyCode == 8) {
        if (cursorX > 0) {
            cursorX--
            term.write('\b \b')
            promptData = promptData.slice(0, promptData.length - 1)
        }
    } else if (printable) {
        if (promptCallback) {
            promptData += key
        }
        term.write(key);
        cursorX++
    }
})

function print(str) {
    term.writeln(str !== undefined ? str : "")
}

function pause(callback) {
    promptData = ''
    promptCallback = callback
    isPause = true
    cursorX = 0
}

function input(text, callback) {
    if (typeof text === 'function') {
        text = null
        callback = text
    }

    promptData = ''
    promptCallback = callback
    term.write((text || '') + ' ')
    cursorX = 0
}

function clear() {
    // Requires to be called in a separate tick then the text to clear
    term.clear()
}

function color(colorCode) {
    if (typeof colorCode === 'string') {
        term.write(styles[colorCode].open)
    } else {
        term.write(colorCode)
    }
}

function end() {
    isEnd = true
}

function title(title) {
    document.getElementById('title').innerText = title
    document.getElementsByTagName('title')[0].innerText = title
}

function legend(legendHtml) {
    document.getElementById('legend').innerHTML = legendHtml
}

function resize(rows, cols) {
    term.resize(rows, cols)
}

