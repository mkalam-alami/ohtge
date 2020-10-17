/// <reference path="assets/1htge.d.ts" />

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
