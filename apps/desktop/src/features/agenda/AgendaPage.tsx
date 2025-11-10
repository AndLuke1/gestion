import type { ReactNode } from 'react';
import { CalendarCheck2, ClipboardList, Clock3 } from 'lucide-react';

export default function AgendaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Agenda & tareas</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Coordina tu calendario, recordatorios y tableros Kanban conectados con proyectos.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Highlight icon={<CalendarCheck2 className="h-6 w-6" />} title="Calendario" description="Vista mes/semana/día con sincronización opcional." />
        <Highlight icon={<ClipboardList className="h-6 w-6" />} title="Tareas" description="Prioridades, etiquetas, recurrencia y recordatorios." />
        <Highlight icon={<Clock3 className="h-6 w-6" />} title="Pomodoro" description="Bloques de foco con estadísticas." />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>El módulo de Agenda reutilizará las mismas tareas vinculadas a proyectos y permitirá moverlas entre vistas Lista, Kanban y Calendario.</p>
      </div>
    </div>
  );
}

function Highlight({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">{icon}</div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
