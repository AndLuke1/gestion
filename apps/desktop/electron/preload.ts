import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  toggleTheme: (mode: 'light' | 'dark' | 'system') => ipcRenderer.invoke('theme:toggle', mode),
  data: {
    bootstrap: () => ipcRenderer.invoke('data:bootstrap'),
    createProject: (input: unknown) => ipcRenderer.invoke('data:createProject', input),
    updateProject: (id: string, patch: unknown) => ipcRenderer.invoke('data:updateProject', id, patch),
    archiveProject: (id: string) => ipcRenderer.invoke('data:archiveProject', id),
    listProjects: (filter?: unknown) => ipcRenderer.invoke('data:listProjects', filter),
    addMilestone: (projectId: string, input: unknown) => ipcRenderer.invoke('data:addMilestone', projectId, input),
    listMilestones: (projectId: string) => ipcRenderer.invoke('data:listMilestones', projectId),
    setMilestoneStatus: (id: string, status: string) => ipcRenderer.invoke('data:setMilestoneStatus', id, status),
    listProjectTasks: (projectId: string, options?: unknown) =>
      ipcRenderer.invoke('data:listProjectTasks', projectId, options),
    moveTask: (taskId: string, destination: unknown) => ipcRenderer.invoke('data:moveTask', taskId, destination),
    linkExpenseToProject: (transactionId: string, projectId: string | null) =>
      ipcRenderer.invoke('data:linkExpenseToProject', transactionId, projectId),
    projectFinancials: (projectId: string) => ipcRenderer.invoke('data:projectFinancials', projectId),
    createProjectDoc: (projectId: string, input: unknown) =>
      ipcRenderer.invoke('data:createProjectDoc', projectId, input),
    listProjectDocs: (projectId: string) => ipcRenderer.invoke('data:listProjectDocs', projectId),
    createProjectTemplate: (input: unknown) => ipcRenderer.invoke('data:createProjectTemplate', input),
    listProjectTemplates: () => ipcRenderer.invoke('data:listProjectTemplates'),
  }
});
