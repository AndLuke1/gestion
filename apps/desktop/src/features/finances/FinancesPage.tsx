import type { ReactNode } from 'react';
import { Wallet, PieChart, TrendingUp } from 'lucide-react';

export default function FinancesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Finanzas personales</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Administra cuentas, categorías, transacciones y reportes desde un mismo lugar.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={<Wallet className="h-6 w-6" />}
          title="Cuentas y saldos"
          description="Registra cuentas bancarias, billeteras y tarjetas."
        />
        <SummaryCard
          icon={<PieChart className="h-6 w-6" />}
          title="Presupuestos"
          description="Define límites mensuales y recibe alertas de desvíos."
        />
        <SummaryCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Reportes"
          description="Analiza ingresos vs gastos con filtros por proyecto."
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p>
          Próximamente aquí verás el tablero completo de Finanzas con tablas, gráficos y la integración con IA para clasificar transacciones automáticamente.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
