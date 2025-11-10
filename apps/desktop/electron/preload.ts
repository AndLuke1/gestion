import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  toggleTheme: (mode: 'light' | 'dark' | 'system') => ipcRenderer.invoke('theme:toggle', mode)
});
