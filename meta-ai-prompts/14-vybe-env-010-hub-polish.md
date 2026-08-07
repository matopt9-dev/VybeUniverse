# VYBE-ENV-010 — Hub furniture polish (after shell scripts)

**Depends on:** Owner ran `VybeArrivalPlazaGraybox` + `VybeWorldShellZones`. Preview spawn works.

## Paste into Meta Gen AI (Code and Act)

```
JOB NAME: VYBE-ENV-010 — Social Pulse Hub seating and wayfinding polish
MODE: Code and Act
SCOPE: Only entities under 02_SOCIAL_PULSE_HUB (and Path_P1* if needed for gaps).
DO NOT TOUCH: Arrival plaza systems, scripts, other zones, Persistent Variables.

INSPECT FIRST: Hub_Floor, Hub_CentralLandmark, Hub_ConversationPad_A/B/C, Hub_RecoverySpawn.

CREATE (if missing):
- 6 Seat gizmos around pads A/B/C, named Hub_Seat_01..06, on the floor, not overlapping.
- 2 Text signs: Hub_Wayfind_Creator ("← CREATOR") near west edge; Hub_Wayfind_Venue ("VENUE →") near east edge.
- Keep existing landmark and floor.

TRANSFORMS: Stay inside hub footprint center (0,0,55) size ~60x55. Floor Y ≈ 0.
PARENTING: Under 02_SOCIAL_PULSE_HUB furniture/signage groups if present.
MATERIAL: Light neutral seating, cyan accents matching Hub_CentralLandmark. No logos. No copyrighted brands.
COLLISION: Seats usable; do not block Path_P1.
SCRIPTING: None.
VALIDATE: No floating props; walkable from Path_P1 onto Hub_Floor; Preview walk to Hub_RecoverySpawn.
STOP CONDITION: If scripts fail to compile or you would modify other zones, stop and report.
COMPLETION REPORT: objects created/moved, transforms, Preview result, remaining issue, next job VYBE-ENV-011.
```

## Next jobs (same pattern, one zone each)

- **VYBE-ENV-011** — Safety Help Center readable boards + clear entrance from Path_P9  
- **VYBE-ENV-012** — Game Lounge three station pads (visual only; no new mini-game scripts yet)  
- **VYBE-ENV-013** — Live Venue stage apron + audience floor markers  
- **VYBE-ENV-014** — Kenney import placement (owner imports OBJs first)

Never invent REST/Firebase social feeds. Never create fake “online friends” UIs.
