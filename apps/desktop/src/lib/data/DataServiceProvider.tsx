import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import type { IDataService, ProjectFilter } from './DataService';
import { createMockDataService } from './mockData';

const DataServiceContext = createContext<IDataService | null>(null);

export function DataServiceProvider({ children }: PropsWithChildren) {
  const service = useMemo<IDataService>(() => {
    const bridge = window.electronAPI?.data;
    if (!bridge) {
      return createMockDataService();
    }
    return {
      bootstrap: () => bridge.bootstrap(),
      createProject: (input) => bridge.createProject(input),
      updateProject: (id, patch) => bridge.updateProject(id, patch),
      archiveProject: (id) => bridge.archiveProject(id),
      listProjects: (filter?: ProjectFilter) => bridge.listProjects(filter),
      addMilestone: (projectId, input) => bridge.addMilestone(projectId, input),
      listMilestones: (projectId) => bridge.listMilestones(projectId),
      setMilestoneStatus: (id, status) => bridge.setMilestoneStatus(id, status),
      listProjectTasks: (projectId, options) => bridge.listProjectTasks(projectId, options),
      moveTask: (taskId, destination) => bridge.moveTask(taskId, destination),
      linkExpenseToProject: (transactionId, projectId) => bridge.linkExpenseToProject(transactionId, projectId),
      projectFinancials: (projectId) => bridge.projectFinancials(projectId),
      createProjectDoc: (projectId, input) => bridge.createProjectDoc(projectId, input),
      listProjectDocs: (projectId) => bridge.listProjectDocs(projectId),
      createProjectTemplate: (input) => bridge.createProjectTemplate(input),
      listProjectTemplates: () => bridge.listProjectTemplates(),
    } satisfies IDataService;
  }, []);

  useEffect(() => {
    void service.bootstrap?.();
  }, [service]);

  return <DataServiceContext.Provider value={service}>{children}</DataServiceContext.Provider>;
}

export function useDataService(): IDataService {
  const ctx = useContext(DataServiceContext);
  if (!ctx) throw new Error('useDataService debe usarse dentro de DataServiceProvider');
  return ctx;
}
