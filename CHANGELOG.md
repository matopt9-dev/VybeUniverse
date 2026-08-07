# Changelog

All notable project-level notes for VybeUniverse → Vybe Social Horizon Edition reconstruction.

## [Phases 6–8] — 2026-07-17

### Phase 4 evidence note

- Preview/multiplayer for prior vertical slice recorded as **OWNER-REPORTED PASS (2026-07-17)** per owner “everything is green” — **not** agent-observed.

### Phase 6 — Curated art spike + plaza polish

- Staged 6 Kenney CC0 OBJs + license evidence under `horizon-assets/source/kenney/` (Unity Assets untouched).
- Import manifest with faces/roles/verification fields: `horizon-assets/KENNEY_IMPORT_MANIFEST.md`.
- Runtime polish: `VybeAudioEnvironment` audio zone; `VybeWorldDirectory` landmark flash + directory connections.
- Meta AI prompts `06`–`09`; report `Docs/PHASE_6_ART_REPORT.md`.
- Editor import/placement **PENDING OWNER**.

### Phase 7 — Multiplayer QA + performance

- Formal matrix `test-reports/phase7-qa-matrix-2026-07-17.md`.
- Hardened `VybePulseChallenge`: authority checks, ownership transfer state, pad cooldown, success latch, bounded maps/timers, debug toggle.
- Performance budget checklist (no invented FPS): `Docs/PHASE_7_QA_PERFORMANCE.md`.
- Owner matrix retest **PENDING**.

### Phase 8 — Social District + release readiness

- New `VybeSocialDistrict` — directory/portal/gather check-in loop; hides locked district roots.
- Docs: `Docs/PHASE_8_SOCIAL_DISTRICT.md`, prompt `10`, `release-checklists/HORIZON_RELEASE_GATE.md`.
- Local `tsc` PASS + sync — `test-reports/phase6-8-compile-2026-07-17.md`.
- **Not published / not complete.**

## [Phases 3–5] — 2026-07-17

### Phase 3 — Architecture (code PASS; Preview N/A)

- Documented system map + contracts in `Docs/HORIZON_ARCHITECTURE.md`, setup/test docs.
- Added independent systems: `VybePlayerLifecycle`, `VybeAudioEnvironment`, `VybeDebug` helper contract.
- Preserved `VybeBootstrapSmoke` + `VybeSpawnRecovery`.
- Runtime imports: `horizon/core` only (this world).

### Phase 4 — Vertical slice (code PASS; Preview OWNER-REPORTED PASS 2026-07-17)

- `VybeWorldDirectory` — trigger + popup / TextGizmo.
- `VybePortalPad` — same-world `SpawnPointGizmo.teleportPlayer`.
- `VybeSocialCheckIn` — real-player check-in + NetworkEvent (no fake feed).
- `VybePulseChallenge` — coop pads A/B/C with join/leave/late join/authority/score/reset.
- Meta AI wiring: `meta-ai-prompts/04-vertical-slice-wiring.md`.
- Test report + checklist: `test-reports/vertical-slice-compile-2026-07-17.md`, `Docs/HORIZON_SYSTEMS_TEST.md`.

### Phase 5 — World design foundation (docs/manifest PASS; plaza build PENDING OWNER)

- `Docs/WORLD_DESIGN_FOUNDATION.md`, `ARRIVAL_PLAZA_BUILD_MANIFEST.md`, `EDITOR_SCRIPTS_POLICY.md`.
- Kenney curated import: `horizon-assets/KENNEY_IMPORT_MANIFEST.md`.
- Meta AI plaza prompt: `meta-ai-prompts/05-arrival-plaza-foundation.md`.
- Event stage: hidden/noninteractive policy; districts locked until Preview/multiplayer PASS.
- Updated `PROJECT_STATUS`, `FEATURE_MATRIX`, `KNOWN_ISSUES`, `NEXT_ACTIONS`.
- **Unity Assets not modified.** Project not complete until owner Preview/multiplayer/performance/publishing.

## [Phase 2 — partial] — 2026-07-17

### Spawn + recovery (same day)

- Verified in this world's `horizon_core.d.ts`: `SpawnPointGizmo.teleportPlayer`, `OnPlayerEnterWorld` / `OnPlayerExitWorld`, `OnPlayerEnterTrigger`, `Entity.exists` / `Entity.as`.
- Added `VybeSpawnRecovery` (`horizon-scripts/systems/` + synced to world `scripts/`): join teleport + recovery trigger; null-safe; `debugLogs` prop; smoke left intact.
- Local compile **PASS** (tsc 4.7.4) for smoke + spawn. Evidence: `test-reports/spawn-recovery-compile-2026-07-17.md`.
- Meta AI prompts updated: `02-spawn-point-placeholder.md`, `03-spawn-recovery-attach.md`.
- Preview attach of spawn/recovery still **PENDING owner**.

### World binding + bootstrap smoke

- Bound Horizon world **`1192248460643536`** (local path under Meta Horizon Worlds AppData). Editor title still **New world** — rename pending.
- Mirrored runtime typings into `horizon-scripts/types/` (`horizon_core`, `HorizonGlobal`); editor typings kept for reference only.
- Proven runtime module for this world: **`horizon/core` only**. Do not invent `horizon/ui` / social / 2p until present in this world’s `scripts/types`.
- Added `VybeBootstrapSmoke` (`horizon-scripts/systems/` + synced to world `scripts/`). Fixed event target to `this.entity` for `OnPlayerEnterWorld`.
- Local compile **PASS** with TypeScript **4.7.4** (Cursor `node.exe`; npm not on PATH) using `skipLibCheck` + world-proven includes. Evidence: `Docs/HORIZON_WORLD_BINDING.md`.
- Docs: `HORIZON_WORLD_BINDING.md`, `ASSET_EXTRACTION_PLAN.md` (Kenney CC0; no uncontrolled Unity export), updated `PROJECT_STATUS.md`, `NEXT_ACTIONS.md`, `HORIZON_REBUILD_PLAN.md`, `horizon-scripts/README.md`.
- Meta AI prompts: bootstrap + spawn/recovery under `meta-ai-prompts/`.
- **Unity Assets not modified.**
- Preview attach of smoke still **PENDING owner**.

## [Phase 1] — 2026-07-17

### Forensic audit (documentation only)

- Completed Phase 1 forensic audit synthesis into `docs/` (executive audit, scenes, scripts, assets, packages, working/broken features, Horizon compatibility matrix, legal register, migration risks, rebuild plan, project status, feature matrix, known issues, next actions, Replit boundaries).
- Created pipeline folders with README stubs: `horizon-assets/`, `horizon-scripts/`, `replit-tools/`, `test-reports/`, `release-checklists/`, `meta-ai-prompts/`, `unity-reference/`.
- **Horizon reconstruction had NOT started** at Phase 1 close.
- **Unity project was NOT modified** (no `Assets/` / gameplay script / package changes in this phase).
- **Hard blocker recorded:** create/open dedicated Vybe Social Horizon Edition world and use that world's generated typings before any Horizon scripts.
- Honest findings retained: no Unity multiplayer netcode; prod `/api/v1` invitations/achievements/identity blocked (SPA); Kenney CC0 OBJ present; many binary meta orphans; landmark shells non-exportable; VybeUniverse is not a Horizon project.
