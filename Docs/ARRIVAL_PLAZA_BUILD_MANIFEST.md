# Arrival Plaza — Editor Build Manifest

**World:** `1192248460643536`  
**Goal:** Polished arrival plaza with named entities matching scripts.  
**Primary path this session:** run editor script `VybeArrivalPlazaGraybox` (places graybox + wires systems).

## Session status

| Layer | Status |
|-------|--------|
| Runtime scripts (`Vybe*`) | Present in world `scripts/` |
| Scene geometry / art | **Missing until you Run both editor scripts** |
| Dense Arrival Plaza | `editor_scripts/VybeArrivalPlazaGraybox.ts` |
| World shell (02–10 + paths) | `editor_scripts/VybeWorldShellZones.ts` |
| Kenney OBJs | Staged in repo — **import PENDING OWNER** |

## Build order

1. **Run `VybeArrivalPlazaGraybox`** (dense plaza + script wiring)  
2. **Run `VybeWorldShellZones`** (districts + pathways)  
3. Preview join → spawn; walk Hub / Safety / Games  
4. Register Persistent Variable `vybe_checkin_count`  
5. Optional: assign true AudioGizmo to `VybeAmbience.ambienceAudio`  
6. Meta AI polish (`meta-ai-prompts/14-…`) one zone at a time  
7. Import curated Kenney OBJs — replace graybox hero props  
8. Social District wiring only after plaza + hub PASS  
9. Keep locked districts **hidden** — no fake shop/feed  

## Entity map (exact names)

| Name | Role |
|------|------|
| `VybePlazaFloor` | Walkable graybox floor |
| `VybeWelcomeLandmark` | Brand silhouette + directory color flash target |
| `VybeWelcomeSign` | Text “VYBE” |
| `VybeSpawnPoint` | Join / recovery destination |
| `VybeRecoveryVolume` | Fall recovery trigger |
| `VybeSpawnSystem` | Script `VybeSpawnRecovery` |
| `VybePlayerLifecycle` | Welcome + NetworkEvent |
| `VybeBootstrap` | Optional smoke logs |
| `VybeDirectory` + `VybeDirectoryTrigger` + `VybeDirectorySign` | Directory loop |
| `VybeSocialCheckIn` + `VybeCheckInTrigger` + `VybeCheckInSign` | Real-player check-in |
| `VybePortalPad` + `VybePortalPadTrigger` + `VybePortalDestination` | Same-world portal |
| `VybePulseChallenge` + Start/Leave/Reset + PadA/B/C + scoreboard | Coop pulse |
| `VybeAmbience` | Audio env (sound assign later) |
| `VybeLocked*Root` | Hidden stubs for later districts |

## Connections

| From | To | Mechanism |
|------|----|-----------|
| Join | `VybeSpawnPoint` | `VybeSpawnRecovery` |
| Recovery volume | `VybeSpawnPoint` | teleport |
| Directory trigger | popup / TextGizmo / landmark flash | `VybeWorldDirectory` |
| Portal pad | `VybePortalDestination` | `VybePortalPad` |
| Check-in trigger | popup + NetworkEvent | `VybeSocialCheckIn` |
| Pulse pads | scoreboard / success | `VybePulseChallenge` |

## Validation

- [ ] Editor script ran without console errors  
- [ ] All required script props non-null  
- [ ] Preview join lands on spawn  
- [ ] Directory / check-in / pulse / portal respond  
- [ ] No fake shop / feed; locked roots hidden  
- [ ] Kenney scale/pivot/collider verified after import  

Owner marks Preview rows in `HORIZON_SYSTEMS_TEST.md`.
