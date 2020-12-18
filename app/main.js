const {app, BrowserWindow} = require('electron');
const path = require("path");

require('electron-reload')(__dirname);

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      nodeIntegration: true
    },
    transparent: true,
    frame: false
  })

  win.loadFile('index.html');
}

app.whenReady()
  .then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate',() => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
