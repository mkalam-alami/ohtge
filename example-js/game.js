/// <reference path="../dist/ohtge.d.ts" />

title("test.exe")
loop()

function loop () {
    write("Hello world")
    color("yellow")
    input("Say something?", function (a) {
        color("white")
        print("You said " + a)
        write()
        pause(loop)
    })
}
