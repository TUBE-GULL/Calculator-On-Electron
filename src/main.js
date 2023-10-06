const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 500,
        frame: false,
        titleBarStyle: 'hidden',
        icon: (path.join(__dirname, 'assets/icons/Icon_calculator.png')),
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.setMenuBarVisibility(false);
    win.setTitle('Calculator')
    win.loadFile(path.join(__dirname, 'index.html'));
    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8'));
    });
};

ipcMain.on('minimize-window', () => {
    if (win) {
        win.minimize();
    }
});

ipcMain.on('close-window', () => {
    if (win) {
        win.close();
    }
})

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());






