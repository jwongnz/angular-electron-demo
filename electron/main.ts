import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('getFiles', (event, arg) => {
  const files = fs.readdirSync(path.join(__dirname, '../../'));
  win.webContents.send('getFilesResponse', files);
});

function createWindow() {
  win = new BrowserWindow({ fullscreen: true });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}
