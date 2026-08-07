# Spawn + recovery compile — VybeSpawnRecovery + VybeBootstrapSmoke

**Date:** 2026-07-17  
**World ID:** `1192248460643536`  
**Result:** **PASS** (exit 0)

---

## APIs verified (this world's `scripts/types/horizon_core.d.ts`)

| API | Status |
|-----|--------|
| `SpawnPointGizmo` class | Present |
| `SpawnPointGizmo.teleportPlayer(player: Player): void` | Present — **used** |
| `Entity.exists(): boolean` | Present — **used** |
| `Entity.as<T>(entityClass): T \| null` | Present — **used** for `SpawnPointGizmo` |
| `TriggerGizmo` | Present (enabled prop; events via CodeBlockEvents) |
| `CodeBlockEvents.OnPlayerEnterWorld` | Present — **used** |
| `CodeBlockEvents.OnPlayerExitWorld` | Present — **used** |
| `CodeBlockEvents.OnPlayerEnterTrigger` | Present — **used** |
| `PropTypes.Entity` / `Boolean` | Present — **used** |
| `Component.register` | Present — **used** |
| `horizon/ui`, social, 2p | **Not** in this world's `scripts/types` — not imported |

No blocker: teleport API exists; spawn system implemented (not faked).

---

## Toolchain

- Node: Cursor helper `%LOCALAPPDATA%\Programs\cursor\resources\app\resources\helpers\node.exe`
- TypeScript: **4.7.4** (`horizon-scripts/node_modules/typescript`)
- Config: `horizon-scripts/tsconfig.smoke.json` (`skipLibCheck`, world-proven types only)
- Command: `tsc -p tsconfig.smoke.json --outDir _compile-out --rootDir .`
- Emit: `_compile-out/systems/VybeBootstrapSmoke.js`, `_compile-out/systems/VybeSpawnRecovery.js`

---

## Scripts

| Script | Role | Local tsc | Synced to world `scripts/` |
|--------|------|-----------|----------------------------|
| `VybeBootstrapSmoke.ts` | Join smoke (unchanged) | PASS | Yes |
| `VybeSpawnRecovery.ts` | Join teleport + recovery trigger | PASS | Yes |

---

## Still pending (owner / Preview)

- Rename world from **New world**
- Attach `VybeSpawnRecovery` + wire spawn/recovery entity props
- Desktop Editor Preview of join + fall-into-recovery teleport
