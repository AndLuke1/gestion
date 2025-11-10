import { NavLink, Route, Routes } from 'react-router-dom';
import { cn } from '../../shared/ui/utils';
import ProjectsOverviewPage from './pages/ProjectsOverviewPage';
import ProjectsKanbanPage from './pages/ProjectsKanbanPage';
import ProjectsTimelinePage from './pages/ProjectsTimelinePage';
import ProjectDocsPage from './pages/ProjectDocsPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import ProjectWizardPage from './pages/ProjectWizardPage';

const tabs = [
  { to: '/proyectos', label: 'Lista' },
  { to: '/proyectos/kanban', label: 'Kanban' },
  { to: '/proyectos/timeline', label: 'Timeline' },
  { to: '/proyectos/docs', label: 'Docs' },
  { to: '/proyectos/ajustes', label: 'Ajustes' },
  { to: '/proyectos/wizard', label: 'Iniciar proyecto' }
];

export default function ProjectsRouter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Proyectos</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Planifica, ejecuta y conecta tus proyectos con finanzas, agenda y objetivos.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end
            className={({ isActive }) =>
              cn(
                'rounded-full border px-4 py-2 text-sm transition',
                isActive
                  ? 'border-brand-500 bg-brand-500 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route index element={<ProjectsOverviewPage />} />
        <Route path="kanban" element={<ProjectsKanbanPage />} />
        <Route path="timeline" element={<ProjectsTimelinePage />} />
        <Route path="docs" element={<ProjectDocsPage />} />
        <Route path="ajustes" element={<ProjectSettingsPage />} />
        <Route path="wizard" element={<ProjectWizardPage />} />
      </Routes>
    </div>
  );
}
