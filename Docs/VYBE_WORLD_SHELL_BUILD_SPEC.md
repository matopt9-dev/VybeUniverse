# Vybe World Shell — Build Spec

**Source:** `editor_scripts/VybeWorldShellZones.ts`  
**Run after:** Arrival Plaza graybox  
**Layer:** Editor Script only

## Root groups

| Name | Purpose |
|------|---------|
| `VYBE_WORLD_ROOT` | Master root |
| `00_SYSTEMS` | Systems bucket |
| `11_PATHWAYS` | Path network |
| `12_GLOBAL_LIGHTING` | Global lights |
| `15_NAVIGATION_AND_SPAWNS` | Spawns |
| `_VYBE_LEGACY_QUARANTINE` | Orphans (at Y=-50) |

## Zones 02–10

| Folder | Center | Floor | Landmark | Sign | Recovery spawn |
|--------|--------|-------|----------|------|----------------|
| `02_SOCIAL_PULSE_HUB` | (0,0,55) | `Hub_Floor` | `Hub_CentralLandmark` | `Hub_TitleSign` | `Hub_RecoverySpawn` |
| `03_CREATOR_DISTRICT` | (-70,0,55) | `Creator_Floor` | `Creator_StageLandmark` | `Creator_TitleSign` | `Creator_RecoverySpawn` |
| `04_VYBE_LIVE_VENUE` | (75,0,60) | `Venue_Floor` | `Venue_MainStage` | `Venue_TitleSign` | `Venue_RecoverySpawn` |
| `05_GAME_LOUNGE` | (-70,0,-45) | `Games_Floor` | `Games_CentralLandmark` | `Games_TitleSign` | `Games_RecoverySpawn` |
| `06_DISCOVERY_BOULEVARD` | (70,0,-45) | `Discovery_Floor` | `Discovery_Landmark` | `Discovery_TitleSign` | `Discovery_RecoverySpawn` |
| `07_EXPRESSION_STUDIO` | (-125,0,30) | `Expression_Floor` | `Expression_Landmark` | `Expression_TitleSign` | `Expression_RecoverySpawn` |
| `08_CALM_SPACE` | (120,0,15) | `Calm_Floor` | `Calm_Landmark` | `Calm_TitleSign` | `Calm_RecoverySpawn` |
| `09_SAFETY_HELP_CENTER` | (0,0,-65) | `Safety_Floor` | `Safety_Landmark` | `Safety_TitleSign` | `Safety_RecoverySpawn` |
| `10_EVENT_PORTAL_CONCOURSE` | (0,0,115) | `PortalConcourse_Floor` | `PortalConcourse_Landmark` | `PortalConcourse_TitleSign` | `PortalConcourse_RecoverySpawn` |

Each zone gets subfolders: `_FLOORS`, `_ARCHITECTURE`, `_SIGNAGE`, `_LIGHTING`, `_SPAWNS`, key light, pillars, title text.

## Pathways (`11_PATHWAYS`)

| Name | Position | Scale |
|------|----------|-------|
| `Path_P1_Arrival_to_Hub` | (0, -0.04, 28) | (6, 0.08, 20) |
| `Path_P1b_Hub_Approach` | (0, -0.04, 42) | (8, 0.08, 12) |
| `Path_P2_Arrival_to_Games` | (-28, -0.04, -18) | (28, 0.08, 5) |
| `Path_P2b_Games_Approach` | (-55, -0.04, -32) | (18, 0.08, 5) |
| `Path_P3_Arrival_to_Discovery` | (28, -0.04, -18) | (28, 0.08, 5) |
| `Path_P3b_Discovery_Approach` | (55, -0.04, -32) | (18, 0.08, 5) |
| `Path_P4_Hub_to_Creator` | (-35, -0.04, 55) | (30, 0.08, 6) |
| `Path_P5_Hub_to_Venue` | (38, -0.04, 58) | (30, 0.08, 6) |
| `Path_P6_Hub_to_Portals` | (0, -0.04, 88) | (6, 0.08, 30) |
| `Path_P7_Creator_to_Expression` | (-98, -0.04, 42) | (30, 0.08, 5) |
| `Path_P8_Venue_to_Calm` | (98, -0.04, 35) | (28, 0.08, 5) |
| `Path_P9_Arrival_to_Safety` | (0, -0.04, -42) | (5, 0.08, 18) |

## Hub extras

`Hub_ConversationPad_A/B/C`, `Safety_RulesBoard`, `Global_RimLight`, marker `VybeWorldShell_Marker`

## Material / visual intent

Bright premium futuristic social: dark floors `#2f3440`, path `#3a4150`, walls `#c8d0dc`, zone-colored landmarks (cyan hub, coral venue, green games, etc.). Soft key lights. No harsh flashing.

## Do not

- Import these files into runtime Scripts  
- Invent unfinished mini-game scripts on empty zone shells  
- Leave zone shells labeled as open features that do nothing — signs may say zone names; lock interactables until wired  
