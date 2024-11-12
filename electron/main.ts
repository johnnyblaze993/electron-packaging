// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;
let testWindow: BrowserWindow | null = null;

function getPreloadPath() {
  return path.join(app.getAppPath(), 'build', 'preload.js'); // Dynamically resolves preload path
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Directly load the Vite development server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools(); // Opens DevTools for debugging

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Log load success or failure for debugging
  mainWindow.webContents.on('did-finish-load', () => {
    console.log("Content loaded in Electron");
  });
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
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

  // Directly load the Vite test route
  testWindow.loadURL('http://localhost:5173/test');
  testWindow.setMenuBarVisibility(false);

  testWindow.on('closed', () => {
    testWindow = null;
  });
}

// IPC listener for opening the test window
ipcMain.on('open-test-window', () => {
  if (!testWindow) createTestWindow();
});

// Create the main window when the app is ready
app.whenReady().then(createMainWindow);

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
