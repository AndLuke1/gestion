# Projects module scaffold

This directory will contain the React components, Zustand stores, and routing
setup for the GestionVida Projects experience. Planned sub-folders include:

- `pages/` – top-level routes (list, kanban, timeline, dashboard, docs, settings).
- `components/` – reusable UI widgets (ProjectCard, KanbanBoard, TimelineChart).
- `hooks/` – data hooks wrapping the `DataService` methods.
- `ai/` – helpers that orchestrate the AI adapter for wizards and updates.

Each screen will follow the design system (Tailwind + shadcn/ui) and integrate
with the shared layout shell.
