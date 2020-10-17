/// <reference path="../assets/1htge.d.ts" />

title("1htgedoc.exe")
legend("<a href=\"https://github.com/mkalam-alami/1htge\">1htge</a> documentation. \
  Sources of these docs <a href=\"https://github.com/mkalam-alami/1htge/blob/master/docs/game.js\">available here</a>")
color("bold")
resize(120, 20)

loop()

function loop() {
  clear()
  color('white')
  print("WELCOME TO THE 1HTGE DOCUMENTATION")
  print("==================================")
  print("[1] View API documentation")
  print("[2] Download sources as a ZIP")
  print("[3] Browse color codes on Github")
  print("[4] Browse all sources on Github")
  print("==================================")
  print()

  color("cyan")
  input("?", function (a) {
    color("white")
    print()

    switch (a) {
      case '1':
        print("print(str)         | Displays [str] to the screen and goes to the next line.")
        print("pause(cb)          | Pauses the execution until the user presses Enter, then calls [cb].")
        print("input([str ,] cb)  | Displays [str], waits for user input and calls [cb] with the input as argument.")
        print("clear()            | Clears the screen. (Can't clean text printed the same tick, `setTimeout` is a workaround)")
        print("color(code)        | Changes font color and styling. Check the lib sources for valid codes.")
        print("end()              | Stops the execution. You probably want to call `return` right after.")
        print("title(str)         | Changes the fake window name and page title")
        print("legend(html)       | Displays arbitrary HTML under the game")
        print("resize(rows, cols) | Resizes the game window")
        
        pause(loop)
        break

      case '2':
        window.location = 'https://github.com/mkalam-alami/1htge/archive/master.zip'
        setTimeout(loop)
        break

      case '3':
        window.location = 'https://github.com/mkalam-alami/1htge/blob/c0732876e8f30c3379f366a3bc64f236381d7e3c/assets/1htge.js#L17'
        end()
        return

      case '4':
        window.location = 'https://github.com/mkalam-alami/1htge'
        end()
        return
    }
  })
}