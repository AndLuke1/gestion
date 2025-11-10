import type {
  IDataService,
  Project,
  Milestone,
  Task,
  ProjectDocument,
  ProjectTemplate,
  ProjectFinancialSummary,
  UUID,
} from './DataService';

interface Store {
  projects: Project[];
  milestones: Milestone[];
  tasks: Task[];
  docs: ProjectDocument[];
  templates: ProjectTemplate[];
  financials: Record<UUID, ProjectFinancialSummary>;
}

const now = new Date();

const seedProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Tesis de grado',
    type: 'estudio',
    description: 'Planificar y ejecutar la tesis de ingeniería con defensas y entregas',
    status: 'active',
    start: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
    end: new Date(now.getFullYear(), now.getMonth() + 2, 1).toISOString(),
    color: '#2563eb'
  },
  {
    id: 'proj-2',
    name: 'Aplicación móvil freelance',
    type: 'trabajo',
    description: 'Desarrollar MVP para cliente fintech',
    status: 'active',
    start: new Date(now.getFullYear(), now.getMonth(), 10).toISOString(),
    end: new Date(now.getFullYear(), now.getMonth() + 3, 20).toISOString(),
    color: '#16a34a'
  },
  {
    id: 'proj-3',
    name: 'Plan de bienestar 2024',
    type: 'personal',
    description: 'Metas de salud, hábitos y finanzas familiares',
    status: 'idea',
    start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
    end: new Date(now.getFullYear(), now.getMonth() + 6, 1).toISOString(),
    color: '#f97316'
  }
];

const seedMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    projectId: 'proj-1',
    title: 'Entrega de marco teórico',
    dueDate: new Date(now.getFullYear(), now.getMonth(), 25).toISOString(),
    status: 'doing',
    notes: 'Revisión con tutor programada'
  },
  {
    id: 'milestone-2',
    projectId: 'proj-1',
    title: 'Defensa preliminar',
    dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 12).toISOString(),
    status: 'todo'
  },
  {
    id: 'milestone-3',
    projectId: 'proj-2',
    title: 'Demo funcional',
    dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 5).toISOString(),
    status: 'doing'
  }
];

const seedTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Investigar bibliografía reciente',
    description: 'Priorizar papers 2022-2024',
    status: 'doing',
    dueDate: new Date(now.getFullYear(), now.getMonth(), 20).toISOString(),
    priority: 'high',
    tags: ['investigación']
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Redactar capítulo metodología',
    description: null,
    status: 'todo',
    dueDate: new Date(now.getFullYear(), now.getMonth(), 28).toISOString(),
    priority: 'medium',
    tags: ['escritura']
  },
  {
    id: 'task-3',
    projectId: 'proj-2',
    title: 'Diseñar flujo onboarding',
    description: 'Entregar mockups al cliente',
    status: 'doing',
    dueDate: new Date(now.getFullYear(), now.getMonth(), 23).toISOString(),
    priority: 'high',
    tags: ['ux', 'cliente']
  },
  {
    id: 'task-4',
    projectId: 'proj-2',
    title: 'Configurar pipeline CI',
    description: null,
    status: 'todo',
    dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 2).toISOString(),
    priority: 'medium',
    tags: ['devops']
  }
];

const seedDocs: ProjectDocument[] = [
  {
    id: 'doc-1',
    projectId: 'proj-1',
    title: 'One-pager Tesis',
    contentMd: '# Objetivo\nCompletar la tesis con foco en analítica educativa.',
    createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 15).toISOString(),
    updatedAt: new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  }
];

const seedTemplates: ProjectTemplate[] = [
  {
    id: 'template-1',
    name: 'Proyecto académico estándar',
    jsonBlueprint: {
      columns: ['Ideas', 'Planificado', 'En curso', 'En revisión', 'Hecho'],
      checklist: ['Definir alcance', 'Reunión con tutor', 'Definir entregables'],
      milestones: ['Marco teórico', 'Metodología', 'Resultados']
    }
  }
];

const seedFinancials: Record<UUID, ProjectFinancialSummary> = {
  'proj-1': {
    projectId: 'proj-1',
    totalIncome: 0,
    totalExpense: 125000,
    balance: -125000,
    transactions: []
  },
  'proj-2': {
    projectId: 'proj-2',
    totalIncome: 350000,
    totalExpense: 120000,
    balance: 230000,
    transactions: []
  }
};

export function createMockDataService(): IDataService {
  const store: Store = {
    projects: [...seedProjects],
    milestones: [...seedMilestones],
    tasks: [...seedTasks],
    docs: [...seedDocs],
    templates: [...seedTemplates],
    financials: { ...seedFinancials }
  };

  return {
    async bootstrap() {
      return;
    },
    async createProject(input) {
      const project: Project = {
        id: crypto.randomUUID(),
        name: input.name ?? 'Nuevo proyecto',
        description: input.description ?? '',
        status: input.status ?? 'idea',
        type: input.type ?? 'personal',
        start: input.start ?? new Date().toISOString(),
        end: input.end ?? null,
        color: input.color ?? '#2563eb'
      };
      store.projects.push(project);
      return project;
    },
    async updateProject(id, patch) {
      const index = store.projects.findIndex((p) => p.id === id);
      if (index === -1) throw new Error('Proyecto no encontrado');
      store.projects[index] = { ...store.projects[index], ...patch };
      return store.projects[index];
    },
    async archiveProject(id) {
      const project = store.projects.find((p) => p.id === id);
      if (!project) return;
      project.status = 'on_hold';
    },
    async listProjects(filter) {
      let results = [...store.projects];
      if (filter?.status?.length) {
        results = results.filter((p) => filter.status!.includes(p.status));
      }
      if (filter?.types?.length) {
        results = results.filter((p) => filter.types!.includes(p.type));
      }
      if (filter?.search) {
        const term = filter.search.toLowerCase();
        results = results.filter((p) =>
          p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
        );
      }
      if (!filter?.includeArchived) {
        results = results.filter((p) => p.status !== 'done');
      }
      return results;
    },
    async addMilestone(projectId, input) {
      const milestone: Milestone = {
        id: crypto.randomUUID(),
        projectId,
        title: input.title ?? 'Nuevo hito',
        dueDate: input.dueDate ?? null,
        status: input.status ?? 'todo',
        notes: input.notes ?? null
      };
      store.milestones.push(milestone);
      return milestone;
    },
    async listMilestones(projectId) {
      return store.milestones.filter((milestone) => milestone.projectId === projectId);
    },
    async setMilestoneStatus(id, status) {
      const milestone = store.milestones.find((m) => m.id === id);
      if (milestone) milestone.status = status;
    },
    async listProjectTasks(projectId, options) {
      let tasks = store.tasks.filter((task) => task.projectId === projectId);
      if (options?.status?.length) {
        tasks = tasks.filter((task) => options.status!.includes(task.status));
      }
      return tasks;
    },
    async moveTask(taskId, destination) {
      const task = store.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (destination.status) {
        task.status = destination.status;
      }
    },
    async linkExpenseToProject(_transactionId, _projectId) {
      return;
    },
    async projectFinancials(projectId) {
      return (
        store.financials[projectId] ?? {
          projectId,
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
          transactions: []
        }
      );
    },
    async createProjectDoc(projectId, input) {
      const doc: ProjectDocument = {
        id: crypto.randomUUID(),
        projectId,
        title: input.title,
        contentMd: input.contentMd,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.docs.push(doc);
      return doc;
    },
    async listProjectDocs(projectId) {
      return store.docs.filter((doc) => doc.projectId === projectId);
    },
    async createProjectTemplate(input) {
      const template: ProjectTemplate = {
        id: crypto.randomUUID(),
        name: input.name,
        jsonBlueprint: input.jsonBlueprint
      };
      store.templates.push(template);
      return template;
    },
    async listProjectTemplates() {
      return [...store.templates];
    }
  } satisfies IDataService;
}
