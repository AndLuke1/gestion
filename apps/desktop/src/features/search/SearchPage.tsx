import { useState } from 'react';
import { Search } from 'lucide-react';

const demoResults = [
  { id: 'res-1', type: 'Proyecto', title: 'Tesis de grado', excerpt: 'Objetivo SMART generado por IA.' },
  { id: 'res-2', type: 'Documento', title: 'One-pager Tesis', excerpt: 'Plan inicial y recursos involucrados.' },
  { id: 'res-3', type: 'Tarea', title: 'Redactar metodología', excerpt: 'Pendiente para la próxima semana.' }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filtered = demoResults.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Búsqueda global</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Encuentra proyectos, tareas, documentos y transacciones desde una sola barra.
        </p>
      </header>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Buscar en GestionVida"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-600 shadow-sm focus:border-brand-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((result) => (
          <article key={result.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-wide text-brand-500">{result.type}</p>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{result.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{result.excerpt}</p>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No hay resultados para “{query}”. Prueba con otra palabra clave.
          </p>
        )}
      </div>
    </div>
  );
}
