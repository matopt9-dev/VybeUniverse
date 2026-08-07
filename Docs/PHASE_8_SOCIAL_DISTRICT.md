# Phase 8 — Social District foundation + release readiness

**Date:** 2026-07-17  
**World:** `1192248460643536`  
**Status:** **CODE / MANIFEST PASS** — Editor build + publish **NOT claimed**

## Scope

First district only: **Social District** — not a dead empty room. Functional loop using proven systems:

1. District directory (popup + TextGizmo)  
2. Portal Arrival Plaza ↔ Social District (`SpawnPointGizmo.teleportPlayer`)  
3. Gather / check-in for **real players** (NetworkEvent session counter — no fake feed)  
4. Locked Creator / Game / Event / Marketplace roots hidden via `Entity.visible.set(false)` when wired  

## Script

`horizon-scripts/systems/VybeSocialDistrict.ts` → synced to world `scripts/`.

### Props (wire in editor)

| Prop | Entity role |
|------|-------------|
| `directoryTrigger` / `directoryText` | District directory |
| `gatherTrigger` / `gatherSign` / `gatherAudio` / `gatherMesh` | Social gather check-in |
| `toDistrictTrigger` / `districtSpawn` | Plaza → district portal |
| `returnTrigger` / `returnSpawn` | District → plaza return |
| `lockedCreatorRoot` / `lockedGameRoot` / `lockedEventRoot` / `lockedMarketplaceRoot` | Hide until later acceptance |
| `checkInCooldownSeconds` / `portalCooldownSeconds` / `debugLogs` | Guards + QA |

## Entity manifest (exact names)

| Entity name | Type | Notes |
|-------------|------|-------|
| `VybeSocialDistrict` | Empty | Attach `VybeSocialDistrict` |
| `VybeSocialDistrictDirectoryTrigger` | Trigger | Directory |
| `VybeSocialDistrictDirectorySign` | Text Gizmo | Optional |
| `VybeSocialDistrictGatherTrigger` | Trigger | Check-in / gather |
| `VybeSocialDistrictGatherSign` | Text Gizmo | Optional |
| `VybeSocialDistrictGatherSfx` | Audio Gizmo | Optional |
| `VybeSocialDistrictSpawn` | Spawn Point | District arrival |
| `VybeToSocialDistrictTrigger` | Trigger | On Arrival Plaza |
| `VybeSocialDistrictReturnTrigger` | Trigger | In district |
| `VybeSocialDistrictReturnSpawn` | Spawn Point | Prefer plaza spawn or lookout |
| `VybeLockedCreatorRoot` | Empty/group | Hidden |
| `VybeLockedGameRoot` | Empty/group | Hidden |
| `VybeLockedEventRoot` | Empty/group | Hidden |
| `VybeLockedMarketplaceRoot` | Empty/group | Hidden |

Reuse Arrival Plaza spawn/recovery/Pulse/check-in scripts — do not remove.

## Meta AI

`meta-ai-prompts/10-social-district-setup.md`

## Publishing / quality gate

See `release-checklists/HORIZON_RELEASE_GATE.md`.

**Do not claim published or complete.**

## Honesty

District graybox + wiring is **PENDING OWNER**. Code + docs only unless owner places entities.
