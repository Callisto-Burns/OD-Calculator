global.__basedir = __dirname

const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow } = electron

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
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
