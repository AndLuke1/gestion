import type { ReactNode } from 'react';
import { Target, CheckCircle2, Flame } from 'lucide-react';

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Objetivos & Planes</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Crea metas SMART, hábitos y roadmaps conectados con proyectos y tareas.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={<Target className="h-6 w-6" />} title="Metas SMART" description="Definición guiada y checklist automático." />
        <Card icon={<CheckCircle2 className="h-6 w-6" />} title="Hitos" description="Seguimiento visual por hitos clave y progreso." />
        <Card icon={<Flame className="h-6 w-6" />} title="Hábitos" description="Rachas, recordatorios y estadísticas." />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>Con IA podrás transformar texto libre en objetivos accionables y recibir propuestas de roadmap para tus proyectos.</p>
      </div>
    </div>
  );
}

function Card({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">{icon}</div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
