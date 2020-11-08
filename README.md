# One Hour Text Game Engine

A very basic wrapper for [xterm.js](https://xtermjs.org/) to make small console games using a BASIC-inspired API. [Docs available here](https://mkalam-alami.github.io/ohtge/docs/).

## Example `game.js` file

```javascript
title("test.exe")
loop()

async function loop() {
    while (1) {
        write("Hello world")
        color("yellow")
        const a = await input("Say something?") // `input(string, callback)` syntax also supported
        color("white")
        write("You said " + a)
        write()
        await pause()
    }
}
```

![](https://raw.githubusercontent.com/mkalam-alami/ohtge/master/lib/ohtge-readme.gif)

## Made with ohtge

* ["freeze.exe"](https://marwane.kalam-alami.net/1hgj/286/) (1HGJ 286 entry, 2020)
* ["prince.exe"](https://marwane.kalam-alami.net/jams/alakajam-k5/) (5th Kajam entry, 2018)
* ["monster.exe"](https://marwane.kalam-alami.net/1hgj/167/) (1HGJ 167 entry, 2018)
* ["Day Off Work"](https://marwane.kalam-alami.net/misc/dayoffwork/) (web port of a 1st Alakajam! entry, 2018)
