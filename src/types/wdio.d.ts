declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: unknown) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: unknown) => Promise<number>
    }
}