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
