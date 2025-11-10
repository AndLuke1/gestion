codex/add-project-management-module-e3ocqt
# Módulo de Proyectos

La carpeta ya contiene la primera iteración funcional del módulo Proyectos:

- `ProjectsRouter.tsx` define la navegación interna (lista, Kanban, timeline, docs, ajustes y asistente).
- `pages/` aloja cada pantalla con integración al `DataService` (mock) y hooks de IA.
- `components/` incluye widgets reutilizables como tarjetas de resumen y próximos hitos.
- `hooks/useAI.ts` encapsula el adaptador de IA con degradación cuando no hay proveedor.

Próximos pasos: conectar con la base de datos real, añadir drag & drop persistente y sincronizar tareas/hitos con Agenda y Finanzas.

# Projects module scaffold

This directory will contain the React components, Zustand stores, and routing
setup for the GestionVida Projects experience. Planned sub-folders include:

- `pages/` – top-level routes (list, kanban, timeline, dashboard, docs, settings).
- `components/` – reusable UI widgets (ProjectCard, KanbanBoard, TimelineChart).
- `hooks/` – data hooks wrapping the `DataService` methods.
- `ai/` – helpers that orchestrate the AI adapter for wizards and updates.

Each screen will follow the design system (Tailwind + shadcn/ui) and integrate
with the shared layout shell.
main
