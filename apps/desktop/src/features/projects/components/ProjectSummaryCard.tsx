import { useEffect, useState } from 'react';
import type { Project, Milestone, ProjectFinancialSummary } from '../../../lib/data/DataService';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import { ProgressIndicator } from './ProgressIndicator';
import { format } from '../../../shared/ui/format';

interface Props {
  project: Project;
  milestones: Milestone[];
}

export function ProjectSummaryCard({ project, milestones }: Props) {
  const dataService = useDataService();
  const [financials, setFinancials] = useState<ProjectFinancialSummary | null>(null);
  const totalMilestones = milestones.length;
  const completed = milestones.filter((m) => m.status === 'done').length;
  const progress = totalMilestones > 0 ? Math.round((completed / totalMilestones) * 100) : 10;

  useEffect(() => {
    (async () => {
      const summary = await dataService.projectFinancials(project.id);
      setFinancials(summary);
    })();
  }, [dataService, project.id]);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{project.type}</p>
        </div>
        <span
          aria-hidden
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: project.color ?? '#2563eb' }}
        />
      </header>
      <ProgressIndicator value={progress} label={`${progress}% completado`} />
      <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div>
          <p className="text-slate-400">Estado</p>
          <p className="font-medium capitalize">{format.projectStatus(project.status)}</p>
        </div>
        <div>
          <p className="text-slate-400">Hitos próximos</p>
          <p className="font-medium">{milestones.filter((m) => m.status !== 'done').length}</p>
        </div>
        <div>
          <p className="text-slate-400">Inicio</p>
          <p className="font-medium">{format.date(project.start)}</p>
        </div>
        <div>
          <p className="text-slate-400">Fin objetivo</p>
          <p className="font-medium">{format.date(project.end)}</p>
        </div>
      </div>
      {financials && (
        <footer className="mt-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800/80">
          <p className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span>Balance</span>
            <span className={financials.balance >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
              {format.currency(financials.balance)}
            </span>
          </p>
          <p className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span>Gastos</span>
            <span>{format.currency(financials.totalExpense)}</span>
          </p>
        </footer>
      )}
    </article>
  );
}
