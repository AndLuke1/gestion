import { app, BrowserWindow, dialog, ipcMain, nativeTheme } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function resolveHtmlPath() {
  if (isDev) {
    const devServerURL = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
    return devServerURL;
  }
  return `file://${path.join(__dirname, '../dist/index.html')}`;
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1320,
    height: 840,
    minWidth: 1100,
    minHeight: 720,
    show: false,
    title: 'GestionVida',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const url = resolveHtmlPath();
  if (isDev) {
    await mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    await mainWindow.loadURL(url);
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    void createWindow();
  }
});

app.whenReady().then(() => {
  if (!fs.existsSync(path.join(app.getPath('userData'), 'backups'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'backups'), { recursive: true });
  }
  void createWindow();
});

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  return result.filePaths;
});

ipcMain.handle('theme:toggle', (_event, value: 'light' | 'dark' | 'system') => {
  if (value === 'system') {
    nativeTheme.themeSource = 'system';
  } else {
    nativeTheme.themeSource = value;
  }
  return nativeTheme.shouldUseDarkColors;
});
