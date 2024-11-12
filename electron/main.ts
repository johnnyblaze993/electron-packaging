// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;
let testWindow: BrowserWindow | null = null;

function getPreloadPath() {
  return path.join(app.getAppPath(), 'build', 'preload.js'); // Dynamically resolves preload path
}

function getHtmlFilePath(fileName: string) {
  return path.join(app.getAppPath(), 'dist', fileName); // Dynamically resolves HTML files in production
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(), // Use the dynamically resolved preload path
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(getHtmlFilePath('index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTestWindow() {
  testWindow = new BrowserWindow({
    width: 600,
    height: 400,
    opacity: 0.8,
    alwaysOnTop: true,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    testWindow.loadURL('http://localhost:3000/test');
  } else {
    testWindow.loadFile(getHtmlFilePath('test.html'));
  }

  testWindow.setMenuBarVisibility(false);

  testWindow.on('closed', () => {
    testWindow = null;
  });
}

// IPC listener for opening the test window
ipcMain.on('open-test-window', () => {
  if (!testWindow) createTestWindow();
});

// app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
