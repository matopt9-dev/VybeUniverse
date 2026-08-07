# HORIZON WORLD BINDING — Vybe Social Horizon Edition

**Last updated:** 2026-07-17  
**Unity Assets modified:** NO

---

## Bound world

| Field | Value |
|-------|-------|
| World ID | `1192248460643536` |
| Editor title (current) | **New world** — **owner must rename** to Vybe Social Horizon Edition |
| Local workspace | `C:\Users\djtwi\AppData\LocalLow\Meta\Horizon Worlds\1192248460643536` |
| Runtime scripts | `...\1192248460643536\scripts\` |
| Editor scripts | `...\1192248460643536\editor_scripts\` |
| Repo mirror | `horizon-scripts/` in VybeUniverse |

Do **not** use Primal Waters `1184324168102632` typings for Vybe code.

---

## Proven modules (this world only)

Evidence from generated typings present under this world's folders:

| Module | Where proven | Use in runtime smoke |
|--------|--------------|----------------------|
| `horizon/core` | `scripts/types/horizon_core.d.ts` | **Yes** — only import allowed for smoke |
| Globals (`console`, etc.) | `scripts/types/HorizonGlobal.d.ts` | Ambient |
| `horizon/editor` | `editor_scripts/types/horizon_editor.d.ts` only | Editor tooling — **not** for world runtime smoke |
| `CreateClasses` | `editor_scripts` only | Editor — **not** for runtime smoke |

**Not proven in this world's `scripts/types`:** `horizon/ui`, `horizon/social`, `horizon/2p`, or any other invented package. Do not import them until they appear after an editor regen for **this** world ID.

Repo `horizon-scripts/types/` also keeps editor copies (`horizon_editor.d.ts`, `CreateClasses.d.ts`) for reference; smoke compile **excludes** them.

---

## Smoke + spawn evidence

| Item | Result |
|------|--------|
| Scripts | `VybeBootstrapSmoke.ts`, `VybeSpawnRecovery.ts` (synced to world `scripts/`) |
| Compiler | TypeScript **4.7.4** via Cursor helper `node.exe` (npm/npx not on PATH) |
| Config | `horizon-scripts/tsconfig.json` + `tsconfig.smoke.json` (`skipLibCheck`, world-proven types only) |
| Local `tsc` | **PASS** (exit 0) — emits `_compile-out/systems/*.js` |
| Reports | `test-reports/smoke-compile-2026-07-17.md`, `test-reports/spawn-recovery-compile-2026-07-17.md` |
| Spawn API | `SpawnPointGizmo.teleportPlayer` **present** in this world's typings |
| Desktop Editor attach / Preview | **PENDING owner** — smoke on `VybeBootstrap`; spawn on `VybeSpawnSystem` |

Note: Meta-generated `.d.ts` uses nested `export declare` inside `declare module`. Local `tsc` without `skipLibCheck` reports TS1038 on those declaration files; with `skipLibCheck` + world-proven includes only, compile **passes**. Editor in-world compile remains the final authority after attach.

---

## Sync rule

1. Edit under `horizon-scripts/systems/` (or copy from world after editor edits).  
2. Keep world `scripts/types` as source of truth for **runtime** modules.  
3. After Desktop Editor regenerates typings, re-copy into `horizon-scripts/types/` and update this file’s proven-module table.
