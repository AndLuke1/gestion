# Electron main-process scaffold

The Electron main-process code will live here. Future updates will add:

- `main.ts` bootstrapping the BrowserWindow, preload scripts, and IPC wiring.
- Secure IPC channels for accessing the `DataService`, backup helpers, and AI
  adapters from the renderer process.
- Auto-migration on first launch plus environment detection (portable mode vs
  installed build).
