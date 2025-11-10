import { CalendarDays } from 'lucide-react';
import type { Milestone, Project } from '../../../lib/data/DataService';
import { format } from '../../../shared/ui/format';

interface Props {
  milestones: Array<Milestone & { project: Project }>;
}

export function UpcomingMilestones({ milestones }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Próximos hitos</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Hitos en los próximos días</p>
        </div>
      </header>
      <div className="mt-4 space-y-3">
        {milestones.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No hay hitos pendientes en esta semana.
          </p>
        )}
        {milestones.map((milestone) => (
          <article
            key={milestone.id}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-800/50"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">{milestone.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{milestone.project.name}</p>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              <p>{format.date(milestone.dueDate)}</p>
              <p className="capitalize">{format.projectStatus(milestone.status)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
