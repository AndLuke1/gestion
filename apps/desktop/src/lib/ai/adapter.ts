// ai/adapter.ts
// -----------------------------------------------------------------------------
// Provider-agnostic AI helpers. The app can switch between OpenAI-compatible
// APIs and local Ollama models. When no provider is configured the exported
// functions resolve with sensible fallbacks so that the UX remains functional.

export type AIProvider = 'openai' | 'ollama' | 'none';

export interface AISettings {
  provider: AIProvider;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export interface ProjectPlanInput {
  goal: string;
  scope: string;
  deadline?: string;
  constraints?: string[];
  resources?: string[];
  context?: Record<string, unknown>;
}

export interface ProjectPlanSuggestion {
  title?: string;
  summary: string;
  projectType?: string;
  smartGoal: string;
  milestones: Array<{ title: string; dueDate?: string; description?: string }>;
  kanbanColumns: string[];
  initialChecklist: string[];
  weeklyEstimate: number;
  risks: Array<{ risk: string; mitigation: string }>;
  stakeholders: string[];
  studyPlan?: Array<{ week: number; focus: string; pomodoroBlocks?: number }>; // optional for academic projects
  budgetDraft?: Array<{ category: string; amount: number }>;
  generatedDoc?: string; // markdown content for the one-pager
}

export interface ProjectPlanRefinementInput {
  projectId: string;
  feedbackText: string;
}

export interface WeeklyDigest {
  projectId: string;
  summary: string;
  completed: string[];
  inProgress: string[];
  blockers: string[];
  suggestedNextSteps: string[];
}

export interface TemplateSuggestion {
  name: string;
  description: string;
  columns: string[];
  defaultChecklist: string[];
  sampleMilestones: string[];
}

export interface AIAdapter {
  summarize(text: string): Promise<string>;
  classifyTransaction(input: { description: string; amount: number; merchant?: string }): Promise<string | null>;
  makeStudyPlan(input: { subject: string; goals: string; timeframeWeeks: number }): Promise<string>;
  goalsFromText(text: string): Promise<string>;
  askDocs(input: { question: string; projectId?: string }): Promise<string>;

  // Project-specific helpers
  initProjectPlan(input: ProjectPlanInput): Promise<ProjectPlanSuggestion | null>;
  refineProjectPlan(input: ProjectPlanRefinementInput): Promise<ProjectPlanSuggestion | null>;
  weeklyProjectDigest(projectId: string, sinceDate?: string): Promise<WeeklyDigest | null>;
  generateProjectTemplate(name: string, useCase: string): Promise<TemplateSuggestion | null>;
}

function noopAdapter(): AIAdapter {
  const resolver = async <T>(fallback: T): Promise<T> => fallback;
  return {
    summarize: (text: string) => resolver(`Resumen: ${text.slice(0, 240)}`),
    classifyTransaction: () => resolver(null),
    makeStudyPlan: () => resolver('Plan de estudio base pendiente de IA'),
    goalsFromText: () => resolver('Meta SMART pendiente de IA'),
    askDocs: () => resolver('No hay IA configurada actualmente.'),
    initProjectPlan: async (input) => {
      const summary = `Plan inicial para ${input.goal}. Alcance: ${input.scope}.`;
      return {
        title: input.goal || 'Nuevo proyecto',
        summary,
        projectType: 'personal',
        smartGoal: `${input.goal} antes de ${input.deadline ?? 'la fecha objetivo'}`,
        milestones: [
          { title: 'Definir alcance', dueDate: input.deadline },
          { title: 'Primer entregable', dueDate: input.deadline }
        ],
        kanbanColumns: ['Ideas', 'Planificado', 'En curso', 'En revisión', 'Hecho'],
        initialChecklist: ['Registrar proyecto', 'Definir responsables', 'Organizar tareas'],
        weeklyEstimate: 6,
        risks: [{ risk: 'Falta de recursos', mitigation: 'Priorizar tareas esenciales' }],
        stakeholders: ['Propietario del proyecto'],
        generatedDoc: `# Objetivo
${summary}

## Recursos
${(input.resources ?? []).join(', ') || 'Por definir'}`
      };
    },
    refineProjectPlan: (input) =>
      resolver({
        title: `Plan refinado`,
        summary: input.feedbackText,
        projectType: 'personal',
        smartGoal: input.feedbackText,
        milestones: [],
        kanbanColumns: [],
        initialChecklist: [],
        weeklyEstimate: 0,
        risks: [],
        stakeholders: []
      }),
    weeklyProjectDigest: () =>
      resolver({
        projectId: 'demo',
        summary: 'Sin novedades recientes.',
        completed: [],
        inProgress: [],
        blockers: [],
        suggestedNextSteps: []
      }),
    generateProjectTemplate: () =>
      resolver({
        name: 'Plantilla base',
        description: 'Estructura inicial sin IA activa',
        columns: ['Ideas', 'Planificado', 'En curso', 'En revisión', 'Hecho'],
        defaultChecklist: ['Definir objetivo', 'Identificar tareas clave'],
        sampleMilestones: ['Inicio', 'Mitad', 'Entrega']
      }),
  };
}

export async function createAIAdapter(settings: AISettings): Promise<AIAdapter> {
  if (!settings || settings.provider === 'none') {
    return noopAdapter();
  }

  if (settings.provider === 'openai') {
    // TODO: instantiate OpenAI SDK compatible client.
    return noopAdapter();
  }

  if (settings.provider === 'ollama') {
    // TODO: connect to local Ollama HTTP API.
    return noopAdapter();
  }

  return noopAdapter();
}
