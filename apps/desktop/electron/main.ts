import { app, BrowserWindow, dialog, ipcMain, nativeTheme } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
codex/add-project-management-module-qq9oz8
import Database from 'better-sqlite3';
import { createDataService, type IDataService } from '../src/lib/data/DataService';

main

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function resolveHtmlPath() {
  if (isDev) {
    const devServerURL = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
    return devServerURL;
  }
  return `file://${path.join(__dirname, '../dist/index.html')}`;
}

codex/add-project-management-module-qq9oz8
let dataService: IDataService | null = null;


main
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

codex/add-project-management-module-qq9oz8
async function setupDataLayer() {
  const dbPath = path.join(app.getPath('userData'), 'gestionvida.db');
  const db = new Database(dbPath);
  dataService = createDataService(db);
  await dataService.bootstrap();
}

app.whenReady().then(async () => {
  if (!fs.existsSync(path.join(app.getPath('userData'), 'backups'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'backups'), { recursive: true });
  }
  await setupDataLayer();

app.whenReady().then(() => {
  if (!fs.existsSync(path.join(app.getPath('userData'), 'backups'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'backups'), { recursive: true });
  }
main
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
codex/add-project-management-module-qq9oz8

function requireDataService(): IDataService {
  if (!dataService) {
    throw new Error('DataService no inicializado');
  }
  return dataService;
}

ipcMain.handle('data:bootstrap', async () => {
  return requireDataService().bootstrap();
});

ipcMain.handle('data:createProject', async (_event, input) => {
  return requireDataService().createProject(input);
});

ipcMain.handle('data:updateProject', async (_event, id, patch) => {
  return requireDataService().updateProject(id, patch);
});

ipcMain.handle('data:archiveProject', async (_event, id) => {
  return requireDataService().archiveProject(id);
});

ipcMain.handle('data:listProjects', async (_event, filter) => {
  return requireDataService().listProjects(filter ?? undefined);
});

ipcMain.handle('data:addMilestone', async (_event, projectId, input) => {
  return requireDataService().addMilestone(projectId, input);
});

ipcMain.handle('data:listMilestones', async (_event, projectId) => {
  return requireDataService().listMilestones(projectId);
});

ipcMain.handle('data:setMilestoneStatus', async (_event, id, status) => {
  return requireDataService().setMilestoneStatus(id, status);
});

ipcMain.handle('data:listProjectTasks', async (_event, projectId, options) => {
  return requireDataService().listProjectTasks(projectId, options ?? undefined);
});

ipcMain.handle('data:moveTask', async (_event, taskId, destination) => {
  return requireDataService().moveTask(taskId, destination);
});

ipcMain.handle('data:linkExpenseToProject', async (_event, transactionId, projectId) => {
  return requireDataService().linkExpenseToProject(transactionId, projectId ?? null);
});

ipcMain.handle('data:projectFinancials', async (_event, projectId) => {
  return requireDataService().projectFinancials(projectId);
});

ipcMain.handle('data:createProjectDoc', async (_event, projectId, input) => {
  return requireDataService().createProjectDoc(projectId, input);
});

ipcMain.handle('data:listProjectDocs', async (_event, projectId) => {
  return requireDataService().listProjectDocs(projectId);
});

ipcMain.handle('data:createProjectTemplate', async (_event, input) => {
  return requireDataService().createProjectTemplate(input);
});

ipcMain.handle('data:listProjectTemplates', async () => {
  return requireDataService().listProjectTemplates();
});

main
