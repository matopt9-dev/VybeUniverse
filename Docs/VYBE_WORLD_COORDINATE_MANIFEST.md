# Vybe World Coordinate Manifest

**Units:** Horizon world units (meters-equivalent as used by Desktop Editor).  
**Origin:** `(0, 0, 0)` · **Ground / floor Y:** `0`  
**Status:** Planning manifest — apply global offset if audit finds occupied space.

## Global rules

| Rule | Value |
|------|-------|
| Primary walkway width | ≥ 5 |
| Secondary walkway width | ≥ 3 |
| Door clear height | ≥ 3 |
| Social ceiling | ~5–8 |
| Venue ceiling | ~10–18 |
| Raised platform Y | 0.15–0.30 |
| Stage Y | 0.60–1.00 |
| No stacked playable zones on same XY footprint |

## Zones

| Zone | Center (X,Y,Z) | Footprint W×D | Entrance (approx) | Primary spawn / checkpoint | Notes |
|------|----------------|---------------|-------------------|----------------------------|-------|
| 01 Arrival Plaza | (0, 0, 0) | 40×40 | (0, 0, -18) | (0, 0.1, 5) | First build |
| 02 Social Pulse Hub | (0, 0, 55) | 60×55 | (0, 0, 28) | (0, 0.1, 45) | After plaza |
| 03 Creator District | (-70, 0, 55) | 55×60 | (-40, 0, 55) | (-70, 0.1, 40) | |
| 04 Vybe Live Venue | (75, 0, 60) | 70×75 | (40, 0, 55) | (75, 0.1, 35) | |
| 05 Game Lounge | (-70, 0, -45) | 65×60 | (-40, 0, -20) | (-70, 0.1, -30) | |
| 06 Discovery Boulevard | (70, 0, -45) | 60×60 | (40, 0, -20) | (70, 0.1, -30) | |
| 07 Expression Studio | (-125, 0, 30) | 45×45 | (-95, 0, 40) | (-125, 0.1, 30) | |
| 08 Calm Space | (120, 0, 15) | 40×45 | (95, 0, 30) | (120, 0.1, 15) | Low sensory |
| 09 Safety Help Center | (0, 0, -65) | 35×30 | (0, 0, -45) | (0, 0.1, -60) | Always reachable |
| 10 Event Portal Concourse | (0, 0, 115) | 65×35 | (0, 0, 90) | (0, 0.1, 110) | Real destinations only |

## Required pathways (centerline targets)

| Path | From → To | Notes |
|------|-----------|-------|
| P1 | Arrival → Pulse Hub | Along +Z, width ≥ 5 |
| P2 | Arrival → Game Lounge | Toward (-70, -45) |
| P3 | Arrival → Discovery | Toward (70, -45) |
| P4 | Hub → Creator | Toward -X |
| P5 | Hub → Live Venue | Toward +X |
| P6 | Hub → Portal Concourse | Toward +Z past hub |
| P7 | Creator → Expression | Continue -X |
| P8 | Live Venue → Calm | Toward +X |
| P9 | Arrival → Safety | Toward -Z |

## Arrival Plaza graybox anchors (script)

Aligned with `VybeArrivalPlazaGraybox` / systems setup (verify after run):

| Object | Role | Approx |
|--------|------|--------|
| `VybePlazaFloor` | Floor | Center near origin, Y=0 |
| `VybeSpawnPoint` | Join | ~(0, 0.1, 5) |
| `VybeRecoveryVolume` | Fall catch | Large, Y negative |
| Directory / check-in / pulse / portal | Interactables | Within 40×40 plaza |

Update this table with **exact** transforms from Meta AI completion reports — never invent live positions after placement.

## Offset protocol

If audit AABB conflicts with this layout:

1. Choose one `GLOBAL_OFFSET = (ox, 0, oz)`.  
2. Add offset to every zone center and path.  
3. Rewrite this file.  
4. Do not offset a single building alone.
