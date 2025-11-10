import { useEffect, useState } from 'react';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import type { Project, ProjectTemplate } from '../../../lib/data/DataService';

export default function ProjectSettingsPage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [color, setColor] = useState('#2563eb');
  const [status, setStatus] = useState<Project['status']>('idea');
  const [type, setType] = useState<Project['type']>('personal');

  useEffect(() => {
    (async () => {
      const [projectList, templateList] = await Promise.all([
        dataService.listProjects(),
        dataService.listProjectTemplates()
      ]);
      setProjects(projectList);
      setTemplates(templateList);
      if (projectList.length > 0) {
        const project = projectList[0];
        setSelectedProjectId(project.id);
        setColor(project.color ?? '#2563eb');
        setStatus(project.status);
        setType(project.type);
      }
    })();
  }, [dataService]);

  useEffect(() => {
    if (!selectedProjectId) return;
    const project = projects.find((p) => p.id === selectedProjectId);
    if (!project) return;
    setColor(project.color ?? '#2563eb');
    setStatus(project.status);
    setType(project.type);
  }, [projects, selectedProjectId]);

  async function handleSave() {
    if (!selectedProjectId) return;
    await dataService.updateProject(selectedProjectId, { color, status, type });
    const updated = await dataService.listProjects();
    setProjects(updated);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
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
        <button
          onClick={handleSave}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-600"
        >
          Guardar cambios
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Personalización</h3>
          <label className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
            Color
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </label>
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Estado
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as Project['status'])}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="idea">Idea</option>
              <option value="active">En curso</option>
              <option value="on_hold">En pausa</option>
              <option value="done">Finalizado</option>
            </select>
          </label>
          <label className="text-sm text-slate-500 dark:text-slate-300">
            Tipo
            <select
              value={type}
              onChange={(event) => setType(event.target.value as Project['type'])}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="personal">Personal</option>
              <option value="estudio">Estudio</option>
              <option value="trabajo">Trabajo</option>
              <option value="emprendimiento">Emprendimiento</option>
              <option value="otro">Otro</option>
            </select>
          </label>
        </div>
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Plantillas disponibles</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {templates.map((template) => (
              <li key={template.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/40">
                <p className="font-medium text-slate-800 dark:text-slate-100">{template.name}</p>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-500 dark:text-slate-400">
                  {JSON.stringify(template.jsonBlueprint, null, 2)}
                </pre>
              </li>
            ))}
            {templates.length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Aún no hay plantillas guardadas.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
