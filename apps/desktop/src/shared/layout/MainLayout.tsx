import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Menu, Sun, MoonStar, Settings, Search, KanbanSquare, CalendarRange, GraduationCap, Target, PiggyBank, FileText, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../lib/theme/useTheme';
import { cn } from '../ui/utils';

const navItems = [
  { to: '/', label: 'Inicio', icon: LayoutDashboard, exact: true },
  { to: '/finanzas', label: 'Finanzas', icon: PiggyBank },
  { to: '/agenda', label: 'Agenda & Tareas', icon: CalendarRange },
  { to: '/universidad', label: 'Universidad', icon: GraduationCap },
  { to: '/objetivos', label: 'Objetivos', icon: Target },
  { to: '/proyectos', label: 'Proyectos', icon: KanbanSquare },
  { to: '/archivos', label: 'Archivos', icon: FileText },
  { to: '/busqueda', label: 'Búsqueda', icon: Search }
];

export default function MainLayout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const currentTitle = useMemo(() => {
    if (location.pathname === '/' || location.pathname === '') return 'Panel General';
    const match = navItems.find((item) => location.pathname.startsWith(item.to));
    return match?.label ?? 'GestionVida';
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="mb-8">
          <span className="text-2xl font-semibold text-brand-600 dark:text-brand-400">GestionVida</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">Tu centro de mando personal</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-3 text-sm text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 transition hover:border-brand-300 dark:border-slate-700 dark:hover:border-brand-500"
          >
            <span>Tema</span>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 transition hover:border-brand-300 dark:border-slate-700 dark:hover:border-brand-500">
            <span>Ajustes</span>
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Resumen</p>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{currentTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="hidden sm:block">Modo: {theme === 'system' ? 'Sistema' : theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-6 dark:bg-slate-950/90">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
