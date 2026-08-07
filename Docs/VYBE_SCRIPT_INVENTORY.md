# Vybe Script Inventory

**World ID:** `1192248460643536`  
**TypeScript:** Horizon package pins `typescript@4.7.4`  
**API:** `horizon/core` `ApiVersion = "2.0.0"` (installed typings)  
**Local smoke compile:** PASS (`horizon-scripts` `tsconfig.smoke.json`, 2026-07-19)

## Runtime Components (world `scripts/`)

| Script | Responsibility | Imports | Attach target | Props / deps | Status |
|--------|----------------|---------|---------------|--------------|--------|
| `VybeBootstrapSmoke` | Join console smoke | `horizon/core` | `VybeBootstrap` | `debugLogs` | KEEP — optional in release |
| `VybeSpawnRecovery` | Join teleport + fall recovery | `horizon/core` | `VybeSpawnSystem` | `spawnPoint`, `recoveryTrigger` | KEEP — **core** |
| `VybePlayerLifecycle` | Join/leave NetworkEvent + welcome popup | `horizon/core` | `VybePlayerLifecycle` | `showWelcomePopup`, `debugLogs` | KEEP |
| `VybeWorldDirectory` | Directory trigger + TextGizmo + landmark flash | `horizon/core` | `VybeDirectory` | trigger/text/landmark | KEEP |
| `VybePortalPad` | Same-world teleport pad | `horizon/core` | `VybePortalPad` | pad + destination (+ optional audio/fx) | KEEP |
| `VybeSocialCheckIn` | Check-in + `persistentStorage` + NetworkEvent | `horizon/core` | `VybeSocialCheckIn` | trigger; key `vybe_checkin_count` | KEEP — needs Systems var |
| `VybePulseChallenge` | Coop 3-pad challenge + ownership transfer | `horizon/core` | `VybePulseChallenge` | many triggers/meshes | KEEP |
| `VybeAudioEnvironment` | Ambience + optional audio zone | `horizon/core` | `VybeAmbience` | AudioGizmo + zone | KEEP when audio exists |
| `VybeSocialDistrict` | District directory/gather/portals | `horizon/core` | `VybeSocialDistrict` | district entities | KEEP — after plaza |

## Editor scripts (world `editor_scripts/`)

| Script | Purpose | Status |
|--------|---------|--------|
| `VybeArrivalPlazaGraybox.ts` | Idempotent plaza graybox + wire runtime scripts | KEEP — **run once** in Editor Scripts |

## Removed / quarantined patterns

| Item | Reason |
|------|--------|
| `VybeDebug.ts` in `scripts/` | Non-Component helper — invalid attach surface; pattern archived under `horizon-scripts/reference/` |
| Graybox previously in `scripts/` | **REPAIRED** — moved to `editor_scripts/` (2026-07-19) |

## Modules available in typings but unused by current scripts

`horizon/ui`, `horizon/camera`, `horizon/navmesh`, `horizon/performance`, `horizon/analytics`, `horizon/unity_asset_bundles`

**Policy:** Do not adopt until a focused job proves need + Preview pass. Prefer popups + TextGizmo until UI job is scoped.

## Requested architecture map (Phase 2 names → current honesty)

| Requested name | Existing equivalent | Action |
|----------------|---------------------|--------|
| VybeWorldBootstrap | `VybeBootstrapSmoke` | KEEP; rename later only if needed |
| VybePlayerLifecycle | `VybePlayerLifecycle` | KEEP |
| VybeSpawnManager | `VybeSpawnRecovery` | KEEP |
| VybePortalController | `VybePortalPad` | KEEP |
| VybeAudioZoneController | `VybeAudioEnvironment` | KEEP |
| VybeRecoveryManager | part of `VybeSpawnRecovery` | Do not duplicate |
| VybeUIManager / full suite | **Not present** | Build only after environment shell + proven `horizon/ui` jobs |
| VybeMatch / PulseRhythm / CreatorQuest | Pulse only (`VybePulseChallenge`) | Add games **after** plaza + hub space exists |
| VybeDebugPanel | none | Dev-only later; never expose to players |

**Do not** create the full Phase 2 file list as empty stubs. Add components only when entities + Preview validation exist.

## Orphans / duplicates

| Issue | Detail |
|-------|--------|
| Duplicate join UX | Bootstrap smoke no longer shows popup; Lifecycle owns welcome — OK |
| SocialDistrict vs plaza check-in | Separate NetworkEvents — OK if entities not double-wired |
| Orphan risk | Scripts with null props idle safely — still need graybox wiring |

## Editor compile claim

**Blocked by missing project access.** Cursor cannot open Scripts panel compile output. Local mirror `tsc` ≠ editor authority.
