import type { ReactNode } from 'react';
import { CloudUpload, FileText, ShieldCheck } from 'lucide-react';

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Archivos & adjuntos</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Guarda documentos en %APPDATA%/GestionVida y vincúlalos con cualquier entidad.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={<CloudUpload className="h-6 w-6" />} title="Arrastra y suelta" description="Adjunta archivos rápidamente desde el explorador." />
        <Card icon={<FileText className="h-6 w-6" />} title="Visor integrado" description="Previsualiza PDF e imágenes sin salir de la app." />
        <Card icon={<ShieldCheck className="h-6 w-6" />} title="Privacidad" description="Datos locales, cifrado opcional y backups automáticos." />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>Los adjuntos se indexarán en la búsqueda global y alimentarán el motor de IA para resúmenes y consultas.</p>
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
