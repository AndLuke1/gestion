# Electron main-process

El proceso principal ya expone una ventana segura con `preload.ts` y maneja utilidades básicas:

- Crea la carpeta de backups dentro de la ruta de usuario.
- Expone `electronAPI.openFileDialog` y `electronAPI.toggleTheme` hacia el renderer mediante `contextBridge`.
- Carga automáticamente la URL de desarrollo (Vite) o el `index.html` empaquetado.

A futuro se conectarán aquí los canales IPC para `DataService`, backups y adaptadores de IA.
