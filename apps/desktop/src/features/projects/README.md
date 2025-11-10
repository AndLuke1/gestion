# Módulo de Proyectos

La carpeta ya contiene la primera iteración funcional del módulo Proyectos:

- `ProjectsRouter.tsx` define la navegación interna (lista, Kanban, timeline, docs, ajustes y asistente).
- `pages/` aloja cada pantalla con integración al `DataService` (mock) y hooks de IA.
- `components/` incluye widgets reutilizables como tarjetas de resumen y próximos hitos.
- `hooks/useAI.ts` encapsula el adaptador de IA con degradación cuando no hay proveedor.

Próximos pasos: conectar con la base de datos real, añadir drag & drop persistente y sincronizar tareas/hitos con Agenda y Finanzas.
