// DataService.ts
// -----------------------------------------------------------------------------
// Centralised façade around the SQLite database. This file only exposes typed
// CRUD helpers and keeps SQL/ORM details hidden from the rest of the app.
// The implementation outlines the required methods according to the product
// brief so that subsequent commits can focus on filling in the logic.

codex/add-project-management-module-qq9oz8
import type Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { and, desc, eq, inArray, like, ne, or } from 'drizzle-orm';
import {
  projects as projectsTable,
  milestones as milestonesTable,
  tasks as tasksTable,
  transactions as transactionsTable,
  projectDocs as projectDocsTable,
  projectTemplates as projectTemplatesTable,
  schema,
} from '../../../db/schema';

import type { Database } from 'better-sqlite3';
main

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

codex/add-project-management-module-qq9oz8
type ProjectsRow = typeof projectsTable.$inferSelect;
type MilestoneRow = typeof milestonesTable.$inferSelect;
type TaskRow = typeof tasksTable.$inferSelect;
type TransactionRow = typeof transactionsTable.$inferSelect;
type ProjectDocRow = typeof projectDocsTable.$inferSelect;
type ProjectTemplateRow = typeof projectTemplatesTable.$inferSelect;

function mapProject(row: ProjectsRow): Project {
  return {
    id: row.id,
    name: row.name,
    type: row.type as Project['type'],
    description: row.description ?? '',
    status: row.status as Project['status'],
    start: row.start ?? null,
    end: row.end ?? null,
    color: row.color ?? null,
  };
}

function mapMilestone(row: MilestoneRow): Milestone {
  return {
    id: row.id,
    projectId: row.projectId,
    title: row.title,
    dueDate: row.dueDate ?? null,
    status: row.status as Milestone['status'],
    notes: row.notes ?? null,
  };
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    projectId: row.projectId ?? null,
    title: row.title,
    description: row.description ?? null,
    status: row.status,
    dueDate: row.dueDate ?? null,
    priority: (row.priority as Task['priority']) ?? 'medium',
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

function mapTransaction(row: TransactionRow): Transaction {
  return {
    id: row.id,
    accountId: row.accountId,
    date: row.date,
    amount: row.amount,
    categoryId: row.categoryId ?? null,
    notes: row.notes ?? null,
    tags: Array.isArray(row.tags) ? row.tags : [],
    projectId: row.projectId ?? null,
  };
}

function mapProjectDoc(row: ProjectDocRow): ProjectDocument {
  return {
    id: row.id,
    projectId: row.projectId,
    title: row.title,
    contentMd: row.contentMd,
    createdAt: row.createdAt ?? new Date().toISOString(),
    updatedAt: row.updatedAt ?? new Date().toISOString(),
  };
}

function mapTemplate(row: ProjectTemplateRow): ProjectTemplate {
  let blueprint: Record<string, unknown> = {};
  try {
    blueprint = row.jsonBlueprint ? (JSON.parse(row.jsonBlueprint) as Record<string, unknown>) : {};
  } catch (error) {
    console.warn('No se pudo parsear la plantilla de proyecto', error);
  }
  return {
    id: row.id,
    name: row.name,
    jsonBlueprint: blueprint,
  };
}

export class DataService implements IDataService {
  private readonly orm: BetterSQLite3Database<typeof schema>;

  constructor(private readonly db: Database) {
    this.orm = drizzle(db, { schema });
  }

  async bootstrap(): Promise<void> {
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT DEFAULT '',
        status TEXT NOT NULL DEFAULT 'idea',
        start TEXT,
        end TEXT,
        color TEXT
      );
      CREATE TABLE IF NOT EXISTS milestones (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        due_date TEXT,
        status TEXT NOT NULL DEFAULT 'todo',
        notes TEXT
      );
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        priority TEXT NOT NULL DEFAULT 'medium',
        status TEXT NOT NULL DEFAULT 'todo',
        tags TEXT,
        project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
        rrule TEXT
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        date TEXT NOT NULL,
        amount REAL NOT NULL,
        category_id TEXT,
        notes TEXT,
        tags TEXT,
        attachment_id TEXT,
        recurring INTEGER DEFAULT 0,
        rrule TEXT,
        project_id TEXT REFERENCES projects(id) ON DELETE SET NULL
      );
      CREATE TABLE IF NOT EXISTS project_docs (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        content_md TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS project_templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        json_blueprint TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_projects_status_end ON projects(status, end);
      CREATE INDEX IF NOT EXISTS idx_milestones_project ON milestones(project_id, due_date);
      CREATE INDEX IF NOT EXISTS idx_tasks_project_status ON tasks(project_id, status);
      CREATE INDEX IF NOT EXISTS idx_transactions_project_date ON transactions(project_id, date);
      CREATE INDEX IF NOT EXISTS idx_project_docs_project ON project_docs(project_id);
    `);
  }

  async createProject(input: Partial<Project>): Promise<Project> {
    const id = input.id ?? randomUUID();
    const now = new Date().toISOString();
    const values = {
      id,
      name: input.name ?? 'Nuevo proyecto',
      type: input.type ?? 'personal',
      description: input.description ?? '',
      status: input.status ?? 'idea',
      start: input.start ?? now,
      end: input.end ?? null,
      color: input.color ?? null,
    };
    const [row] = await this.orm
      .insert(projectsTable)
      .values(values)
      .returning();
    return mapProject(row);
  }

  async updateProject(id: UUID, patch: Partial<Project>): Promise<Project> {
    const [row] = await this.orm
      .update(projectsTable)
      .set({
        name: patch.name,
        description: patch.description,
        status: patch.status,
        type: patch.type,
        start: patch.start,
        end: patch.end,
        color: patch.color,
      })
      .where(eq(projectsTable.id, id))
      .returning();
    if (!row) throw new Error('Proyecto no encontrado');
    return mapProject(row);
  }

  async archiveProject(id: UUID): Promise<void> {
    await this.orm
      .update(projectsTable)
      .set({ status: 'done' })
      .where(eq(projectsTable.id, id));
  }

  async listProjects(_filter?: ProjectFilter): Promise<Project[]> {
    const filter = _filter ?? {};
    const conditions: any[] = [];
    if (filter.status?.length) {
      conditions.push(inArray(projectsTable.status, filter.status));
    }
    if (filter.types?.length) {
      conditions.push(inArray(projectsTable.type, filter.types));
    }
    if (filter.search) {
      const pattern = `%${filter.search}%`;
      conditions.push(or(like(projectsTable.name, pattern), like(projectsTable.description, pattern)));
    }
    if (!filter.includeArchived) {
      conditions.push(ne(projectsTable.status, 'done'));
    }
    let query = this.orm.select().from(projectsTable);
    if (conditions.length === 1) {
      query = query.where(conditions[0]);
    } else if (conditions.length > 1) {
      query = query.where(and(...conditions));
    }
    query = query.orderBy(projectsTable.start);
    const rows = await query;
    return rows.map(mapProject);
  }

  async addMilestone(_projectId: UUID, _input: Partial<Milestone>): Promise<Milestone> {
    const values = {
      id: _input.id ?? randomUUID(),
      projectId: _projectId,
      title: _input.title ?? 'Nuevo hito',
      dueDate: _input.dueDate ?? null,
      status: _input.status ?? 'todo',
      notes: _input.notes ?? null,
    };
    const [row] = await this.orm.insert(milestonesTable).values(values).returning();
    return mapMilestone(row);
  }

  async listMilestones(_projectId: UUID): Promise<Milestone[]> {
    const rows = await this.orm
      .select()
      .from(milestonesTable)
      .where(eq(milestonesTable.projectId, _projectId))
      .orderBy(milestonesTable.dueDate);
    return rows.map(mapMilestone);
  }

  async setMilestoneStatus(_id: UUID, _status: Milestone['status']): Promise<void> {
    await this.orm
      .update(milestonesTable)
      .set({ status: _status })
      .where(eq(milestonesTable.id, _id));
  }

  async listProjectTasks(_projectId: UUID, _options?: { status?: string[] }): Promise<Task[]> {
    const options = _options ?? {};
    let condition: any = eq(tasksTable.projectId, _projectId);
    if (options.status?.length) {
      condition = and(condition, inArray(tasksTable.status, options.status));
    }
    const rows = await this.orm
      .select()
      .from(tasksTable)
      .where(condition)
      .orderBy(tasksTable.dueDate);
    return rows.map(mapTask);
  }

  async moveTask(_taskId: UUID, _destination: { status?: string; columnId?: UUID }): Promise<void> {
    await this.orm
      .update(tasksTable)
      .set({ status: _destination.status })
      .where(eq(tasksTable.id, _taskId));
  }

  async linkExpenseToProject(_transactionId: UUID, _projectId: UUID | null): Promise<void> {
    await this.orm
      .update(transactionsTable)
      .set({ projectId: _projectId })
      .where(eq(transactionsTable.id, _transactionId));
  }

  async projectFinancials(projectId: UUID): Promise<ProjectFinancialSummary> {
    const rows = await this.orm
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.projectId, projectId))
      .orderBy(transactionsTable.date);
    const transactions = rows.map(mapTransaction);
    const totalIncome = transactions
      .filter((tx) => tx.amount >= 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    return {
      projectId,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactions,

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
main
    };
  }

  async createProjectDoc(projectId: UUID, input: { title: string; contentMd: string }): Promise<ProjectDocument> {
    const now = new Date().toISOString();
codex/add-project-management-module-qq9oz8
    const [row] = await this.orm
      .insert(projectDocsTable)
      .values({
        id: randomUUID(),
        projectId,
        title: input.title,
        contentMd: input.contentMd,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return mapProjectDoc(row);
  }

  async listProjectDocs(_projectId: UUID): Promise<ProjectDocument[]> {
    const rows = await this.orm
      .select()
      .from(projectDocsTable)
      .where(eq(projectDocsTable.projectId, _projectId))
      .orderBy(desc(projectDocsTable.updatedAt));
    return rows.map(mapProjectDoc);
  }

  async createProjectTemplate(input: { name: string; jsonBlueprint: Record<string, unknown> }): Promise<ProjectTemplate> {
    const [row] = await this.orm
      .insert(projectTemplatesTable)
      .values({
        id: randomUUID(),
        name: input.name,
        jsonBlueprint: JSON.stringify(input.jsonBlueprint),
      })
      .returning();
    return mapTemplate(row);
  }

  async listProjectTemplates(): Promise<ProjectTemplate[]> {
    const rows = await this.orm.select().from(projectTemplatesTable).orderBy(projectTemplatesTable.name);
    return rows.map(mapTemplate);

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
main
  }
}

export function createDataService(db: Database): IDataService {
  return new DataService(db);
}
