global.__basedir = __dirname

const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, ipcMain, Menu } = electron

let mainWindow
let isHelpOpen = false

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 370,
        width: 350,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        icon: "src/img/logo-symbol.ico",
        title: ""
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__basedir, "src/index.html"),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        app.quit()
    })

    Menu.setApplicationMenu(null)
    mainWindow.setMenu(null)
    mainWindow.removeMenu()

})

ipcMain.on('show-help-dialogue', (event) => {

    isHelpOpen = true // set status of help window to 'open'

    helpDialogue = new BrowserWindow({
        height: 370,
        width: 350,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        parent: mainWindow,
        icon: "src/img/logo-symbol.ico",
        title: ""
    })

    helpDialogue.loadURL(url.format({
        pathname: path.join(__basedir, "src/help.html"),
        protocol: 'file:',
        slashes: true
    }))

    helpDialogue.setMenu(null)

    helpDialogue.on('close', () => {
        isHelpOpen = false
        // allow help button on main render to open a help window
    })
})

ipcMain.on('is-help-open', (event) => {
    // returns true if help window is open
    event.returnValue = isHelpOpen
})
