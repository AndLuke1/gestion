import { useEffect, useMemo, useState } from 'react';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import type { Project, Task } from '../../../lib/data/DataService';

const defaultColumns = [
  { id: 'idea', title: 'Ideas' },
  { id: 'todo', title: 'Planificado' },
  { id: 'doing', title: 'En curso' },
  { id: 'review', title: 'En revisión' },
  { id: 'done', title: 'Hecho' }
];

export default function ProjectsKanbanPage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const allProjects = await dataService.listProjects({ status: ['active', 'idea'] });
      setProjects(allProjects);
      if (allProjects.length > 0) {
        setSelectedProjectId(allProjects[0].id);
      }
    })();
  }, [dataService]);

  useEffect(() => {
    if (!selectedProjectId) return;
    (async () => {
      const items = await dataService.listProjectTasks(selectedProjectId);
      setTasks(items);
    })();
  }, [dataService, selectedProjectId]);

  const grouped = useMemo(() => {
    return defaultColumns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.status === column.id)
    }));
  }, [tasks]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-500 dark:text-slate-400">Proyecto</label>
        <select
          value={selectedProjectId}
          onChange={(event) => setSelectedProjectId(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
        {grouped.map((column) => (
          <div
            key={column.id}
            className="min-w-[240px] flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{column.title}</h3>
              <span className="text-xs text-slate-500">{column.tasks.length}</span>
            </div>
            <div className="space-y-3">
              {column.tasks.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  Sin tareas
                </p>
              )}
              {column.tasks.map((task) => (
                <article key={task.id} className="rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{task.title}</p>
                  {task.description && (
                    <p className="mt-1 text-slate-500 dark:text-slate-400">{task.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:text-brand-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
