global.__basedir = __dirname

const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 370,
        width: 350,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__basedir, "src/index.html"),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        app.quit()
    })
})

ipcMain.on('show-help-dialogue', () => {

    

    helpDialogue = new BrowserWindow({
        height: 370,
        width: 350,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        parent: mainWindow
    })

    helpDialogue.loadURL(url.format({
        pathname: path.join(__basedir, "src/help.html"),
        protocol: 'file:',
        slashes: true
    }))
})
