const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 500,
        // frame: false,
        icon: path.join(__dirname, 'icon/Icon_calculator.png'),
        resizable: false,
    })
    win.setMenuBarVisibility(false);
    win.setTitle('Calculator')
    win.loadFile('html/index.html');
    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(fs.readFileSync('style/index.css', 'utf8'));
    });
};

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());






