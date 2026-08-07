# Compile report — Phases 6–8 — 2026-07-17

**World ID:** `1192248460643536`  
**Toolchain:** TypeScript 4.7.4 via Cursor `helpers/node.exe` + `horizon-scripts/tsconfig.smoke.json`  
**Result:** **tsc EXIT 0 (PASS)**

## Scripts compiled

| Script | Role | tsc |
|--------|------|-----|
| VybeBootstrapSmoke.ts | Join smoke | PASS |
| VybeSpawnRecovery.ts | Spawn + recovery | PASS |
| VybePlayerLifecycle.ts | Lifecycle | PASS |
| VybeWorldDirectory.ts | Directory + landmark flash | PASS |
| VybePortalPad.ts | Portal | PASS |
| VybeSocialCheckIn.ts | Plaza check-in | PASS |
| VybePulseChallenge.ts | Coop pulse (hardened) | PASS |
| VybeAudioEnvironment.ts | Ambience + audio zone | PASS |
| VybeSocialDistrict.ts | Social District hub | PASS |
| VybeDebug.ts | Helper (do not attach) | PASS |

## Sync

All `systems/*.ts` copied to:

`C:\Users\djtwi\AppData\LocalLow\Meta\Horizon Worlds\1192248460643536\scripts\`

## Evidence split

| Gate | Status |
|------|--------|
| Local compile | **PASS** |
| World script sync | **PASS** |
| Phase 4 Preview/multiplayer | **OWNER-REPORTED PASS** (2026-07-17) — not agent-observed |
| Phase 7 matrix retest | **PENDING OWNER** |
| Editor art import / Social District place | **PENDING OWNER** |
| Published | **NOT claimed** |
