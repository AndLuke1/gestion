import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, initialTheme = 'system' }: PropsWithChildren<{ initialTheme?: Theme }>) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setTheme: (next) => {
      setThemeState(next);
      window.localStorage.setItem('gestionvida.theme', next);
    }
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

function applyTheme(theme: Theme) {
  if (theme === 'system') {
    document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  } else {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
  if (window.electronAPI?.toggleTheme) {
    window.electronAPI.toggleTheme(theme);
  }
}
