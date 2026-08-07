# Vybe Arrival Plaza — Build Spec

**Source:** `editor_scripts/VybeArrivalPlazaGraybox.ts` (Editor Script — NOT runtime)  
**Solution:** Keep as Editor Script; use this spec if Meta Gen AI must rebuild without re-running editor automation.

## Hierarchy groups

| Name | Role |
|------|------|
| `01_ARRIVAL_PLAZA` | Zone root |
| `Arrival_ARCHITECTURE` | Landmark, walls, columns, canopy, arches |
| `Arrival_FLOORS` | Floor + path stubs |
| `Arrival_FURNITURE` | Benches, rings, kiosks |
| `Arrival_SIGNAGE` | Text |
| `Arrival_LIGHTING` | Static lights |
| `Arrival_INTERACTIONS` | Triggers |
| `Arrival_SYSTEMS` | Script hosts |

## Architecture / floors (Trimesh, collidable unless noted)

| Name | Position | Scale | Tint intent | Purpose |
|------|----------|-------|-------------|---------|
| `VybePlazaFloor` | (0, -0.05, 0) | (40, 0.1, 40) | dark floor | Walkable plaza |
| `Arrival_WelcomeRing` | (0, 0.02, 5) | (10, 0.06, 10) | path | Spawn ring |
| `Arrival_PathStub_ToHub` | (0, -0.04, 24) | (6, 0.08, 12) | path | North exit |
| `Arrival_PathStub_ToSafety` | (0, -0.04, -24) | (5, 0.08, 10) | path | South exit |
| `Arrival_PathStub_ToGames` | (-18, -0.04, -12) | (14, 0.08, 5) | path | SW |
| `Arrival_PathStub_ToDiscovery` | (18, -0.04, -12) | (14, 0.08, 5) | path | SE |
| `VybeWelcomeLandmark` | (0, 3, -8) | (3, 6, 1.4) | accent orange | Brand landmark |
| `Arrival_Canopy` | (0, 6.5, -6) | (14, 0.25, 8) | cyan | Canopy (non-collidable OK) |
| `Arrival_Column_*` | corners/N/S | (1.2, 5, 1.2) | column | Columns |
| `Arrival_Wall_*` | perimeter | see script | wall | Openings at paths |
| Portal arch L/R/Top | near (-8.., 12) | see script | — | Portal frame |
| Pulse arena + pad meshes | ~ (7, *, 14) | see script | pulse | Pulse area |
| Check-in / portal pads | see script | — | — | Interaction pads |
| Benches | furniture | — | seat | Seating |

## Lights / text / spawns / triggers

| Name | Type | Approx transform | Notes |
|------|------|------------------|-------|
| `VybePlazaKeyLight` | StaticLight | (0, 14, 0) | Key light |
| `VybeWelcomeSign` | Text | (0, 5.5, -7) scale 3 | `VYBE` |
| Map / wayfinding texts | Text | see script | Hub / Safety |
| `VybeSpawnPoint` | Spawn | (0, 0.15, 5) | Join |
| `VybeRecoveryVolume` | Trigger | large under plaza | Fall recovery |
| `VybeDirectoryTrigger` | Trigger | near kiosk | Directory |
| `VybeCheckInTrigger` | Trigger | check-in pad | Check-in |
| `VybePortalPadTrigger` | Trigger | portal pad | Portal |
| `VybePortalDestination` | Spawn | (0, 0.15, 22) | Lookout |
| `VybePulseStart/Leave/Reset/PadA/B/C` | Trigger | pulse area | Active Pulse |
| `VybePulseScoreboard` | Text | pulse area | Score |

## System empties + scripts

Wire per `VYBE_SCRIPT_PROPERTY_MAP.md` (SpawnRecovery, Lifecycle, Bootstrap, Directory, CheckIn, Portal, Pulse, Ambience).

## Locked stubs (hidden)

`VybeLockedCreatorRoot`, `VybeLockedGameRoot`, `VybeLockedEventRoot`, `VybeLockedMarketplaceRoot`

## Do not

- Place this file in **Scripts** panel  
- Attach as a runtime Component  
- Duplicate entities that already exist with these exact names  
