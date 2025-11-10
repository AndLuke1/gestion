export {}; // ensure this file is treated as a module

declare global {
  interface Window {
    electronAPI?: {
      openFileDialog?: () => Promise<string[]>;
      toggleTheme?: (mode: 'light' | 'dark' | 'system') => Promise<boolean> | boolean;
    };
  }
}
