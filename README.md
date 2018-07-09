# One Hour Text Game Engine

A very basic wrapper for [xterm.js](https://xtermjs.org/) to make small console games using a BASIC-inspired API. [Docs available here](https://mkalam-alami.github.io/1htge/docs/).

### Example `game.js` file

```
title("test.exe")
legend("A <a href=\"https://github.com/mkalam-alami/1htge\">1htge</a> test game")
color("bold")

loop()

function loop () {
    print("Hello world")
    color("yellow")
    input("Say something?", function (a) {
      color("white")
      print("You said " + a)
      print()
      loop()
    })
}
```

![](https://raw.githubusercontent.com/mkalam-alami/1htge/master/assets/1htge-readme.jpg)