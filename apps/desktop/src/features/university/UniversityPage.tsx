import type { ReactNode } from 'react';
import { GraduationCap, BookOpenCheck, Timer } from 'lucide-react';

export default function UniversityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Universidad</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Organiza materias, parciales, finales y planes de estudio con Pomodoro integrado.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Feature icon={<GraduationCap className="h-6 w-6" />} title="Materias" description="Plan de cursada por semestre con avance visual." />
        <Feature icon={<BookOpenCheck className="h-6 w-6" />} title="Exámenes" description="Seguimiento de parciales, finales y notas." />
        <Feature icon={<Timer className="h-6 w-6" />} title="Pomodoro" description="Sesiones enfocadas con métricas por materia." />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>La IA sugerirá planes semanales y quizzes a partir de tus apuntes. Integraremos adjuntos y búsqueda en notas.</p>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">{icon}</div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
