import { FormEvent, useState } from 'react';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import { useAI } from '../hooks/useAI';

interface WizardState {
  goal: string;
  scope: string;
  deadline: string;
  constraints: string;
  resources: string;
  budget: number;
}

export default function ProjectWizardPage() {
  const dataService = useDataService();
  const ai = useAI();
  const [state, setState] = useState<WizardState>({
    goal: '',
    scope: '',
    deadline: '',
    constraints: '',
    resources: '',
    budget: 0
  });
  const [plan, setPlan] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    try {
      const planResult = await ai.initProjectPlan({
        goal: state.goal,
        scope: state.scope,
        deadline: state.deadline,
        constraints: state.constraints.split(',').map((item) => item.trim()).filter(Boolean),
        resources: state.resources.split(',').map((item) => item.trim()).filter(Boolean),
        budget: state.budget
      });
      setPlan(planResult.summary);
      const project = await dataService.createProject({
        name: planResult.title ?? state.goal,
        description: planResult.summary,
        type: planResult.projectType ?? 'personal',
        start: new Date().toISOString(),
        end: state.deadline ? new Date(state.deadline).toISOString() : null,
        status: 'idea'
      });
      await Promise.all(
        planResult.milestones.map((milestone) =>
          dataService.addMilestone(project.id, {
            title: milestone.title,
            dueDate: milestone.dueDate ?? null,
            status: 'todo'
          })
        )
      );
    } catch (error) {
      setPlan('No se pudo generar el plan automáticamente. Revísalo manualmente.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Objetivo
            <input
              value={state.goal}
              onChange={(event) => setState((prev) => ({ ...prev, goal: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Alcance
            <input
              value={state.scope}
              onChange={(event) => setState((prev) => ({ ...prev, scope: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Fecha objetivo
            <input
              type="date"
              value={state.deadline}
              onChange={(event) => setState((prev) => ({ ...prev, deadline: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Presupuesto (ARS)
            <input
              type="number"
              value={state.budget}
              onChange={(event) => setState((prev) => ({ ...prev, budget: Number(event.target.value) }))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        </div>
        <label className="text-sm text-slate-500 dark:text-slate-300">
          Restricciones (separadas por coma)
          <input
            value={state.constraints}
            onChange={(event) => setState((prev) => ({ ...prev, constraints: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
        <label className="text-sm text-slate-500 dark:text-slate-300">
          Recursos disponibles (separados por coma)
          <input
            value={state.resources}
            onChange={(event) => setState((prev) => ({ ...prev, resources: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
        <button
          type="submit"
          disabled={isGenerating}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? 'Generando plan...' : 'Generar plan con IA'}
        </button>
      </form>
      {plan && (
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-700 dark:border-brand-600/50 dark:bg-brand-900/20 dark:text-brand-200">
          <h3 className="text-base font-semibold">Plan sugerido</h3>
          <p className="mt-2 whitespace-pre-wrap">{plan}</p>
        </div>
      )}
    </div>
  );
}
