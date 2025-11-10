codex/add-project-management-module-qq9oz8

codex/add-project-management-module-e3ocqt
main
# GestionVida Desktop

GestionVida es una aplicación de escritorio (Electron + React + Vite + TypeScript) diseñada para centralizar finanzas personales, agenda, universidad, objetivos, archivos y el nuevo módulo de proyectos de manera offline-first.

Este repositorio ya incluye un cascarón funcional con:

- Tooling completo para desarrollar y empaquetar la app (`apps/desktop/package.json`, Vite, Tailwind, electron-builder).
- Proceso principal de Electron (`apps/desktop/electron/main.ts`) con preload seguro y scripts para ejecutar en modo desarrollo o empaquetado.
- Interfaz React con layout listo (sidebar + topbar) y rutas para cada módulo.
- Implementación inicial del módulo **Proyectos**: lista, Kanban, timeline, documentos Markdown, ajustes y asistente “Iniciar proyecto” con fallback de IA.
codex/add-project-management-module-qq9oz8
- `DataService` real que persiste proyectos, hitos, tareas, documentos y finanzas en SQLite utilizando Drizzle ORM.

- Mock de `DataService` que entrega datos de ejemplo y permite probar el flujo de proyectos sin SQLite aún.
main
- Adaptador de IA con degradación controlada cuando no hay proveedor configurado.

## Ejecución rápida

```bash
cd apps/desktop
npm install
npm run dev
```

El script arranca Vite para el renderer, compila el proceso principal y abre la ventana de Electron.

codex/add-project-management-module-qq9oz8
La base de datos SQLite se crea automáticamente en la ruta de datos de usuario de Electron (por ejemplo `%APPDATA%/GestionVida/gestionvida.db`) junto con la carpeta `backups/`.


main
### Build / empaquetado

```bash
npm run build      # compila renderer + proceso principal
npm run package    # genera instalador NSIS GestionVidaSetup.exe en apps/desktop/dist
```

## Próximos pasos sugeridos

codex/add-project-management-module-qq9oz8
1. Integrar los proveedores de IA (OpenAI y Ollama) en `lib/ai/adapter.ts`.
2. Completar los módulos restantes (finanzas, agenda, universidad, objetivos, archivos) usando los contratos existentes.
3. Conectar búsqueda global y backups automáticos con la base local.
4. Añadir pruebas (unidad e integración) para los servicios críticos y smoke tests de UI.

1. Sustituir el mock del `DataService` por la implementación real con SQLite + Drizzle ORM.
2. Integrar los proveedores de IA (OpenAI y Ollama) en `lib/ai/adapter.ts`.
3. Completar los módulos restantes (finanzas, agenda, universidad, objetivos, archivos) usando los contratos existentes.
4. Conectar búsqueda global y backups automáticos con la base local.
5. Añadir pruebas (unidad e integración) para los servicios críticos y smoke tests de UI.
main

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
codex/add-project-management-module-qq9oz8


# GestionVida Desktop (Project Skeleton)

This repository contains a high-level project skeleton and architectural blueprint for the GestionVida desktop application described in the product brief. The focus of this iteration is to establish the directory structure, technology decisions, and core abstractions (such as the `DataService` and AI adapter contracts) that will guide full implementation.

## Current contents

- `apps/desktop/` – workspace for the Electron + React + Vite desktop client.
  - `electron/` – placeholder for the Electron main-process code.
  - `src/` – React renderer source.
    - `lib/data/DataService.ts` – strongly typed façade for database operations.
    - `lib/ai/adapter.ts` – provider-agnostic AI interface with OpenAI and Ollama stubs.
    - `lib/backup/backupService.ts` – outline of the backup/restore helpers.
    - `features/projects/` – initial project module notes and UI scaffolding TODOs.
  - `db/schema.ts` – Drizzle ORM schema draft covering the extended data model.
  - `db/migrations/` – placeholder for forthcoming migrations generated from the schema.
- `apps/desktop/scripts/Setup-ayuda-Windows.ps1` – onboarding helper script outline for Windows developers.

The code currently focuses on type definitions, interface contracts, and TODO blocks that describe the logic still to be implemented. These stubs provide guidance for subsequent development sprints.

## Next steps

1. Flesh out the Electron/Vite tooling (package.json, build scripts, electron-builder configuration).
2. Implement Drizzle migrations and wire them to the `DataService` methods.
3. Build out each feature module UI using Tailwind + shadcn/ui, starting from the provided contracts.
4. Integrate AI providers following the `ai/adapter.ts` abstractions and ensure graceful fallbacks when no provider is configured.
5. Complete backup/restore automation and add tests for critical flows.

This repository will evolve into the full GestionVida application in future commits.
main
main
