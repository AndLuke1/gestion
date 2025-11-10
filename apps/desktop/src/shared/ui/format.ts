const dateFormatter = new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' });
const currencyFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export const format = {
  date(value?: string | null) {
    if (!value) return 'Sin fecha';
    return dateFormatter.format(new Date(value));
  },
  currency(value: number) {
    return currencyFormatter.format(value / 100);
  },
  projectStatus(status: string) {
    const mapping: Record<string, string> = {
      idea: 'Idea',
      active: 'En curso',
      on_hold: 'En pausa',
      done: 'Finalizado'
    };
    return mapping[status] ?? status;
  }
};
