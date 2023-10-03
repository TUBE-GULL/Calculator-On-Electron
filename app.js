const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 500,
        // frame: false,
        icon: path.join(__dirname, 'icon/Icon_calculator.png'),
        // resizable: false,
    })
    win.setMenuBarVisibility(false);
    win.setTitle('Calculator')
    win.loadFile('html/index.html');
    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(fs.readFileSync('style/index.css', 'utf8'));

        // prohibits pressing unnecessary buttons

        win.webContents.on('keydown', (event) => {
            const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', 'ArrowLeft', 'ArrowRight',];

            console.log(event)
            if (event.key == 'Backspace') {
                // eraseExecute();
            }
            if (event.key == 'Delete') {
                // deleteExecute();
            }
            if (!allowedKeys.includes(event.key)) {
                event.preventDefault();
            }
        });
    });
};

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());






