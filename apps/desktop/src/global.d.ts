codex/add-project-management-module-qq9oz8
import type {
  Project,
  ProjectDocument,
  ProjectFilter,
  ProjectFinancialSummary,
  ProjectTemplate,
  Milestone,
  Task,
} from './lib/data/DataService';

type ElectronDataAPI = {
  bootstrap: () => Promise<void>;
  createProject: (input: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, patch: Partial<Project>) => Promise<Project>;
  archiveProject: (id: string) => Promise<void>;
  listProjects: (filter?: ProjectFilter) => Promise<Project[]>;
  addMilestone: (projectId: string, input: Partial<Milestone>) => Promise<Milestone>;
  listMilestones: (projectId: string) => Promise<Milestone[]>;
  setMilestoneStatus: (id: string, status: Milestone['status']) => Promise<void>;
  listProjectTasks: (projectId: string, options?: { status?: string[] }) => Promise<Task[]>;
  moveTask: (taskId: string, destination: { status?: string; columnId?: string }) => Promise<void>;
  linkExpenseToProject: (transactionId: string, projectId: string | null) => Promise<void>;
  projectFinancials: (projectId: string) => Promise<ProjectFinancialSummary>;
  createProjectDoc: (
    projectId: string,
    input: { title: string; contentMd: string }
  ) => Promise<ProjectDocument>;
  listProjectDocs: (projectId: string) => Promise<ProjectDocument[]>;
  createProjectTemplate: (input: {
    name: string;
    jsonBlueprint: Record<string, unknown>;
  }) => Promise<ProjectTemplate>;
  listProjectTemplates: () => Promise<ProjectTemplate[]>;
};


main
export {}; // ensure this file is treated as a module

declare global {
  interface Window {
    electronAPI?: {
      openFileDialog?: () => Promise<string[]>;
      toggleTheme?: (mode: 'light' | 'dark' | 'system') => Promise<boolean> | boolean;
codex/add-project-management-module-qq9oz8
      data?: ElectronDataAPI;

main
    };
  }
}
