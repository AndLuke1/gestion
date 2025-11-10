import { useEffect, useMemo, useState } from 'react';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import type { Milestone, Project, Task } from '../../../lib/data/DataService';
import { format } from '../../../shared/ui/format';

interface TimelineItem {
  id: string;
  label: string;
  type: 'milestone' | 'task';
  start: string | null;
  end: string | null;
}

export default function ProjectsTimelinePage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const all = await dataService.listProjects({ status: ['active', 'idea'] });
      setProjects(all);
      if (all.length > 0) {
        setSelectedProjectId(all[0].id);
      }
    })();
  }, [dataService]);

  useEffect(() => {
    if (!selectedProjectId) return;
    (async () => {
      const [milestoneList, taskList] = await Promise.all([
        dataService.listMilestones(selectedProjectId),
        dataService.listProjectTasks(selectedProjectId)
      ]);
      setMilestones(milestoneList);
      setTasks(taskList);
    })();
  }, [dataService, selectedProjectId]);

  const timeline = useMemo<TimelineItem[]>(() => {
    return [
      ...milestones.map((milestone) => ({
        id: milestone.id,
        label: milestone.title,
        type: 'milestone' as const,
        start: milestone.dueDate,
        end: milestone.dueDate
      })),
      ...tasks
        .filter((task) => task.dueDate)
        .map((task) => ({
          id: task.id,
          label: task.title,
          type: 'task' as const,
          start: task.dueDate,
          end: task.dueDate
        }))
    ].sort((a, b) => new Date(a.start ?? 0).getTime() - new Date(b.start ?? 0).getTime());
  }, [milestones, tasks]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
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
      <div className="space-y-3">
        {timeline.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Aún no hay tareas u hitos con fechas para mostrar en el timeline.
          </p>
        )}
        {timeline.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {item.type === 'milestone' ? 'Hito' : 'Tarea'}
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              <p>{format.date(item.start)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
