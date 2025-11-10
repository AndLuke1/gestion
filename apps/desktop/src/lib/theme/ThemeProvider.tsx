import { PropsWithChildren, useEffect, useMemo } from 'react';
import { ThemeProvider as NextThemeProvider } from './useTheme';

export function ThemeProvider({ children }: PropsWithChildren) {
  const defaultTheme = useMemo(() => {
    const stored = window.localStorage.getItem('gestionvida.theme');
    if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
    return 'system';
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('bg-slate-50', 'dark:bg-slate-950');
  }, []);

  return <NextThemeProvider initialTheme={defaultTheme}>{children}</NextThemeProvider>;
}
