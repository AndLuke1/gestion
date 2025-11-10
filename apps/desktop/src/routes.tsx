import { createHashRouter } from 'react-router-dom';
import MainLayout from './shared/layout/MainLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import FinancesPage from './features/finances/FinancesPage';
import AgendaPage from './features/agenda/AgendaPage';
import UniversityPage from './features/university/UniversityPage';
import GoalsPage from './features/goals/GoalsPage';
import FilesPage from './features/files/FilesPage';
import SearchPage from './features/search/SearchPage';
import ProjectsRouter from './features/projects/ProjectsRouter';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'finanzas', element: <FinancesPage /> },
      { path: 'agenda', element: <AgendaPage /> },
      { path: 'universidad', element: <UniversityPage /> },
      { path: 'objetivos', element: <GoalsPage /> },
      { path: 'archivos', element: <FilesPage /> },
      { path: 'busqueda', element: <SearchPage /> },
      { path: 'proyectos/*', element: <ProjectsRouter /> }
    ]
  }
]);
