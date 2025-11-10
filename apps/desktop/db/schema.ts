// db/schema.ts
// -----------------------------------------------------------------------------
// Draft Drizzle ORM schema capturing the entities described in the brief.
// The actual implementation will be refined when hooking up drizzle-kit.

codex/add-project-management-module-qq9oz8
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

import { sqliteTable, text, integer, real, blob } from 'drizzle-orm/sqlite-core';
main
import { sql } from 'drizzle-orm';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  description: text('description').default(''),
  status: text('status').notNull().default('idea'),
  start: text('start'),
  end: text('end'),
  color: text('color'),
});

export const milestones = sqliteTable('milestones', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  title: text('title').notNull(),
  dueDate: text('due_date'),
  status: text('status').notNull().default('todo'),
  notes: text('notes'),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: text('due_date'),
  priority: text('priority').notNull().default('medium'),
  status: text('status').notNull().default('todo'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  projectId: text('project_id').references(() => projects.id),
  rrule: text('rrule'),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  start: text('start').notNull(),
  end: text('end').notNull(),
  location: text('location'),
  notes: text('notes'),
  projectId: text('project_id').references(() => projects.id),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  categoryId: text('category_id'),
  notes: text('notes'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  attachmentId: text('attachment_id'),
  recurring: integer('recurring', { mode: 'boolean' }).default(false),
  rrule: text('rrule'),
  projectId: text('project_id').references(() => projects.id),
});

export const projectDocs = sqliteTable('project_docs', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  title: text('title').notNull(),
  contentMd: text('content_md').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const projectTemplates = sqliteTable('project_templates', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  jsonBlueprint: text('json_blueprint').notNull(),
});

// Additional tables from the brief would be defined here (accounts, categories,
// budgets, attachments, etc.). For brevity they are omitted in this skeleton.
codex/add-project-management-module-qq9oz8

export const schema = {
  projects,
  milestones,
  tasks,
  events,
  transactions,
  projectDocs,
  projectTemplates,
};

main
