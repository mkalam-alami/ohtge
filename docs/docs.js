/// <reference path="../dist/ohtge.d.ts" />

title("ohtgedoc.exe")
color("bold")
resize(120, 20)

loop()

function loop() {
  clear()
  color('white')
  write("WELCOME TO THE ohtge DOCUMENTATION")
  write("==================================")
  write("[1] View API documentation")
  write("[2] Download sources as a ZIP")
  write("[3] Browse color codes on Github")
  write("[4] Browse all sources on Github")
  write("==================================")
  write()

  color("cyan")
  input("?", function (a) {
    color("white")
    write()

    switch (a) {
      case '1':
        write("write(str)         | Displays [str] to the screen and goes to the next line.")
        write("pause(cb)          | Pauses the execution until the user presses Enter, then calls [cb].")
        write("input([str ,] cb)  | Displays [str], waits for user input and calls [cb] with the input as argument.")
        write("clear()            | Clears the screen. (Can't clean text printed the same tick, `setTimeout` is a workaround)")
        write("color(code)        | Changes font color and styling. Check the lib sources for valid codes.")
        write("end()              | Stops the execution. You probably want to call `return` right after.")
        write("title(str)         | Changes the fake window name and page title")
        write("resize(rows, cols) | Resizes the game window")
        
        pause(loop)
        break

      case '2':
        window.location = 'https://github.com/mkalam-alami/ohtge/archive/master.zip'
        setTimeout(loop)
        break

      case '3':
        window.location = 'https://github.com/mkalam-alami/ohtge/blob/c0732876e8f30c3379f366a3bc64f236381d7e3c/assets/ohtge.js#L17'
        end()
        return

      case '4':
        window.location = 'https://github.com/mkalam-alami/ohtge'
        end()
        return
    }
  })
}