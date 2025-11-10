codex/add-project-management-module-qq9oz8

codex/add-project-management-module-e3ocqt
main
# Electron main-process

El proceso principal ya expone una ventana segura con `preload.ts` y maneja utilidades básicas:

- Crea la carpeta de backups dentro de la ruta de usuario.
- Expone `electronAPI.openFileDialog` y `electronAPI.toggleTheme` hacia el renderer mediante `contextBridge`.
- Carga automáticamente la URL de desarrollo (Vite) o el `index.html` empaquetado.

A futuro se conectarán aquí los canales IPC para `DataService`, backups y adaptadores de IA.
codex/add-project-management-module-qq9oz8


# Electron main-process scaffold

The Electron main-process code will live here. Future updates will add:

- `main.ts` bootstrapping the BrowserWindow, preload scripts, and IPC wiring.
- Secure IPC channels for accessing the `DataService`, backup helpers, and AI
  adapters from the renderer process.
- Auto-migration on first launch plus environment detection (portable mode vs
  installed build).
main
main
