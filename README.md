# One Hour Text Game Engine

A very basic wrapper for [xterm.js](https://xtermjs.org/) to make small console games using a BASIC-inspired API. [Docs available here](https://mkalam-alami.github.io/1htge/docs/).

## Example `game.js` file

```
title("test.exe")
legend("A <a href=\"https://github.com/mkalam-alami/1htge\">1htge</a> test game")
loop()

function loop () {
    print("Hello world")
    color("yellow")
    input("Say something?", function (a) {
      color("white")
      print("You said " + a)
      print()
      pause(loop)
    })
}
```

![](https://raw.githubusercontent.com/mkalam-alami/1htge/master/assets/1htge-readme.gif)

## Made with 1htge

* ["prince.exe"](https://marwane.kalam-alami.net/jams/alakajam-k5/) (5th Kajam entry)
* ["monster.exe"](https://marwane.kalam-alami.net/1hgj/167/) (1HGJ 167 entry)
* ["Day Off Work"](https://marwane.kalam-alami.net/misc/dayoffwork/) (web port of a 1st Alakajam! entry)
