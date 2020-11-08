/// <reference path="../dist/ohtge.d.ts" />

title("test.exe")
loop()

async function loop () {
    while (1) {
        write("Hello world")
        color("yellow")
        const a = await input("Say something?")
        color("white")
        write("You said " + a)
        write()
        await pause()
    }
}
