# Vertical slice compile report — 2026-07-17

**World ID:** `1192248460643536`  
**Toolchain:** TypeScript 4.7.4 via Cursor `helpers/node.exe` + `horizon-scripts/tsconfig.smoke.json`  
**Result:** **tsc EXIT 0 (PASS)**

## Scripts compiled

| Script | Role | tsc |
|--------|------|-----|
| VybeBootstrapSmoke.ts | Join smoke | PASS |
| VybeSpawnRecovery.ts | Spawn + recovery | PASS |
| VybePlayerLifecycle.ts | Lifecycle | PASS |
| VybeWorldDirectory.ts | Directory | PASS |
| VybePortalPad.ts | Portal | PASS |
| VybeSocialCheckIn.ts | Social check-in | PASS |
| VybePulseChallenge.ts | Coop activity | PASS |
| VybeAudioEnvironment.ts | Ambience | PASS |
| VybeDebug.ts | Helper module | PASS |

## Sync

All nine `systems/*.ts` copied to:

`C:\Users\djtwi\AppData\LocalLow\Meta\Horizon Worlds\1192248460643536\scripts\`

## Owner Preview / multiplayer

| Gate | Status |
|------|--------|
| Local compile | **PASS** |
| World script sync | **PASS** |
| Desktop Editor attach | **PENDING OWNER PREVIEW** |
| Single-player Preview | **PENDING OWNER PREVIEW** |
| Multiplayer Preview | **PENDING OWNER PREVIEW** |

Do **not** treat this report as Preview PASS. Use `Docs/HORIZON_SYSTEMS_TEST.md` after real editor tests.
