import { useEffect, useState } from 'react';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import type { Project } from '../../../lib/data/DataService';
import { format } from '../../../shared/ui/format';

export default function ProjectsOverviewPage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    (async () => {
      const results = await dataService.listProjects({
        search: search.length > 1 ? search : undefined,
        status: statusFilter === 'all' ? undefined : [statusFilter as Project['status']]
      });
      setProjects(results);
    })();
  }, [dataService, search, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Buscar proyectos"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-600 focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">Todos los estados</option>
          <option value="idea">Idea</option>
          <option value="active">En curso</option>
          <option value="on_hold">En pausa</option>
          <option value="done">Finalizado</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-4 py-3">Proyecto</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Inicio</th>
              <th className="px-4 py-3">Fin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: project.color ?? '#2563eb' }}
                    />
                    <span className="font-medium text-slate-900 dark:text-slate-100">{project.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{project.type}</td>
                <td className="px-4 py-3 capitalize">{format.projectStatus(project.status)}</td>
                <td className="px-4 py-3">{format.date(project.start)}</td>
                <td className="px-4 py-3">{format.date(project.end)}</td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  No se encontraron proyectos con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
