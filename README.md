# GestionVida Desktop

GestionVida es una aplicación de escritorio (Electron + React + Vite + TypeScript) diseñada para centralizar finanzas personales, agenda, universidad, objetivos, archivos y el nuevo módulo de proyectos de manera offline-first.

Este repositorio ya incluye un cascarón funcional con:

- Tooling completo para desarrollar y empaquetar la app (`apps/desktop/package.json`, Vite, Tailwind, electron-builder).
- Proceso principal de Electron (`apps/desktop/electron/main.ts`) con preload seguro y scripts para ejecutar en modo desarrollo o empaquetado.
- Interfaz React con layout listo (sidebar + topbar) y rutas para cada módulo.
- Implementación inicial del módulo **Proyectos**: lista, Kanban, timeline, documentos Markdown, ajustes y asistente “Iniciar proyecto” con fallback de IA.
- `DataService` real que persiste proyectos, hitos, tareas, documentos y finanzas en SQLite utilizando Drizzle ORM.
- Adaptador de IA con degradación controlada cuando no hay proveedor configurado.

## Ejecución rápida

```bash
cd apps/desktop
npm install
npm run dev
```

El script arranca Vite para el renderer, compila el proceso principal y abre la ventana de Electron.

La base de datos SQLite se crea automáticamente en la ruta de datos de usuario de Electron (por ejemplo `%APPDATA%/GestionVida/gestionvida.db`) junto con la carpeta `backups/`.

### Build / empaquetado

```bash
npm run build      # compila renderer + proceso principal
npm run package    # genera instalador NSIS GestionVidaSetup.exe en apps/desktop/dist
```

## Próximos pasos sugeridos

1. Integrar los proveedores de IA (OpenAI y Ollama) en `lib/ai/adapter.ts`.
2. Completar los módulos restantes (finanzas, agenda, universidad, objetivos, archivos) usando los contratos existentes.
3. Conectar búsqueda global y backups automáticos con la base local.
4. Añadir pruebas (unidad e integración) para los servicios críticos y smoke tests de UI.

## Estructura principal

```
apps/desktop/
  index.html
  package.json
  electron/
    main.ts
    preload.ts
    resources/
  src/
    app.tsx
    main.tsx
    routes.tsx
    features/
      projects/
        ProjectsRouter.tsx
        pages/
        components/
    lib/
      data/
      ai/
      theme/
```

Consulta `apps/desktop/src/lib/data/mockData.ts` para ver los datos de ejemplo que alimentan la UI actual.
