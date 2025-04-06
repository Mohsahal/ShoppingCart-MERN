const { app, BrowserWindow } = require('electron');

let mainWindow; // ✅ Declare it at the top level

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // optional depending on your setup
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // or loadFile() if you're serving local HTML

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


