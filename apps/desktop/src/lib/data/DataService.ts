// DataService.ts
// -----------------------------------------------------------------------------
// Centralised façade around the SQLite database. This file only exposes typed
// CRUD helpers and keeps SQL/ORM details hidden from the rest of the app.
// The implementation outlines the required methods according to the product
// brief so that subsequent commits can focus on filling in the logic.

import type { Database } from 'better-sqlite3';

// Basic type helpers ---------------------------------------------------------
export type UUID = string;

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Core entity types ----------------------------------------------------------
export interface Project {
  id: UUID;
  name: string;
  type: 'personal' | 'estudio' | 'trabajo' | 'emprendimiento' | 'otro';
  description: string;
  status: 'idea' | 'active' | 'on_hold' | 'done';
  start: string | null;
  end: string | null;
  color?: string | null;
}

export interface Milestone {
  id: UUID;
  projectId: UUID;
  title: string;
  dueDate: string | null;
  status: 'todo' | 'doing' | 'done';
  notes?: string | null;
}

export interface Task {
  id: UUID;
  projectId?: UUID | null;
  title: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface Transaction {
  id: UUID;
  accountId: UUID;
  date: string;
  amount: number;
  categoryId: UUID | null;
  notes: string | null;
  tags: string[];
  projectId?: UUID | null;
}

export interface ProjectFinancialSummary {
  projectId: UUID;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactions: Transaction[];
}

export interface ProjectDocument {
  id: UUID;
  projectId: UUID;
  title: string;
  contentMd: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTemplate {
  id: UUID;
  name: string;
  jsonBlueprint: Record<string, unknown>;
}

export interface InitProjectWizardInput {
  goal: string;
  scope: string;
  deadline: string | null;
  constraints: string[];
  resources: string[];
  budget?: number | null;
}

export interface ProjectFilter {
  status?: Project['status'][];
  types?: Project['type'][];
  search?: string;
  includeArchived?: boolean;
}

// DataService API ------------------------------------------------------------
export interface IDataService {
  bootstrap(): Promise<void>;

  // Projects
  createProject(input: Partial<Project>): Promise<Project>;
  updateProject(id: UUID, patch: Partial<Project>): Promise<Project>;
  archiveProject(id: UUID): Promise<void>;
  listProjects(filter?: ProjectFilter): Promise<Project[]>;

  // Milestones
  addMilestone(projectId: UUID, input: Partial<Milestone>): Promise<Milestone>;
  listMilestones(projectId: UUID): Promise<Milestone[]>;
  setMilestoneStatus(id: UUID, status: Milestone['status']): Promise<void>;

  // Tasks (project-scoped helpers)
  listProjectTasks(projectId: UUID, options?: { status?: string[] }): Promise<Task[]>;
  moveTask(taskId: UUID, destination: { status?: string; columnId?: UUID }): Promise<void>;

  // Financials
  linkExpenseToProject(transactionId: UUID, projectId: UUID | null): Promise<void>;
  projectFinancials(projectId: UUID): Promise<ProjectFinancialSummary>;

  // Docs
  createProjectDoc(projectId: UUID, input: { title: string; contentMd: string }): Promise<ProjectDocument>;
  listProjectDocs(projectId: UUID): Promise<ProjectDocument[]>;

  // Templates
  createProjectTemplate(input: { name: string; jsonBlueprint: Record<string, unknown> }): Promise<ProjectTemplate>;
  listProjectTemplates(): Promise<ProjectTemplate[]>;
}

export class DataService implements IDataService {
  constructor(private readonly db: Database) {}

  async bootstrap(): Promise<void> {
    // TODO: run migrations using drizzle-kit when wiring in the actual DB layer.
  }

  async createProject(input: Partial<Project>): Promise<Project> {
    throw new Error('Not implemented yet');
  }

  async updateProject(id: UUID, patch: Partial<Project>): Promise<Project> {
    throw new Error('Not implemented yet');
  }

  async archiveProject(id: UUID): Promise<void> {
    throw new Error('Not implemented yet');
  }

  async listProjects(_filter?: ProjectFilter): Promise<Project[]> {
    return [];
  }

  async addMilestone(_projectId: UUID, _input: Partial<Milestone>): Promise<Milestone> {
    throw new Error('Not implemented yet');
  }

  async listMilestones(_projectId: UUID): Promise<Milestone[]> {
    return [];
  }

  async setMilestoneStatus(_id: UUID, _status: Milestone['status']): Promise<void> {
    // TODO: update milestone status and emit change events to renderer.
  }

  async listProjectTasks(_projectId: UUID, _options?: { status?: string[] }): Promise<Task[]> {
    return [];
  }

  async moveTask(_taskId: UUID, _destination: { status?: string; columnId?: UUID }): Promise<void> {
    // TODO: update task lane/column ordering.
  }

  async linkExpenseToProject(_transactionId: UUID, _projectId: UUID | null): Promise<void> {
    // TODO: update transaction linkage.
  }

  async projectFinancials(projectId: UUID): Promise<ProjectFinancialSummary> {
    return {
      projectId,
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      transactions: [],
    };
  }

  async createProjectDoc(projectId: UUID, input: { title: string; contentMd: string }): Promise<ProjectDocument> {
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      projectId,
      title: input.title,
      contentMd: input.contentMd,
      createdAt: now,
      updatedAt: now,
    };
  }

  async listProjectDocs(_projectId: UUID): Promise<ProjectDocument[]> {
    return [];
  }

  async createProjectTemplate(input: { name: string; jsonBlueprint: Record<string, unknown> }): Promise<ProjectTemplate> {
    return {
      id: crypto.randomUUID(),
      name: input.name,
      jsonBlueprint: input.jsonBlueprint,
    };
  }

  async listProjectTemplates(): Promise<ProjectTemplate[]> {
    return [];
  }
}

export function createDataService(db: Database): IDataService {
  return new DataService(db);
}
