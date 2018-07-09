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