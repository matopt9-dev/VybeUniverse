# Horizon systems setup — Desktop Editor

**World:** Vybe Social Horizon Edition (`1192248460643536`)  
**Scripts live in:** world `scripts/` (synced from repo `horizon-scripts/systems/`)

## Prerequisites

1. Desktop Editor open on world `1192248460643536`.
2. Scripts refreshed after sync (reopen Scripts panel if names missing).
3. Rename world display name to **Vybe Social Horizon Edition** if still "New world".

## Entity checklist (exact names)

| Entity name | Type | Attach script | Wire props |
|-------------|------|---------------|------------|
| `VybeBootstrap` | Empty | `VybeBootstrapSmoke` | — |
| `VybeSpawnSystem` | Empty | `VybeSpawnRecovery` | `spawnPoint`, `recoveryTrigger` |
| `VybeSpawnPoint` | Spawn Point | — | — |
| `VybeRecoveryVolume` | Trigger | — | large under plaza / voids |
| `VybePlayerLifecycle` | Empty | `VybePlayerLifecycle` | optional `debugLogs` |
| `VybeDirectory` | Empty | `VybeWorldDirectory` | `directoryTrigger`, optional `directoryText` |
| `VybeDirectoryTrigger` | Trigger | — | near landmark |
| `VybeDirectorySign` | Text Gizmo | — | optional |
| `VybePortalPad` | Empty | `VybePortalPad` | `padTrigger`, `destinationSpawn` |
| `VybePortalPadTrigger` | Trigger | — | pad volume |
| `VybePortalDestination` | Spawn Point | — | lookout / plaza edge |
| `VybeSocialCheckIn` | Empty | `VybeSocialCheckIn` | `checkInTrigger`, optional sign/audio |
| `VybeCheckInTrigger` | Trigger | — | social zone |
| `VybePulseChallenge` | Empty | `VybePulseChallenge` | start/leave/reset + padA/B/C |
| `VybePulseStart` / `Leave` / `Reset` | Trigger | — | activity zone |
| `VybePulsePadA` / `B` / `C` | Trigger | — | three pads |
| `VybePulseScoreboard` | Text Gizmo | — | optional |
| `VybeAmbience` | Empty | `VybeAudioEnvironment` | `ambienceAudio`, optional `audioZoneTrigger` |
| `VybeSocialDistrict` | Empty | `VybeSocialDistrict` | directory/gather/portals + locked roots |
| `VybeToSocialDistrictTrigger` | Trigger | — | on Arrival Plaza |
| `VybeSocialDistrictSpawn` | Spawn Point | — | Social District arrival |
| `VybeSocialDistrictReturnTrigger` | Trigger | — | in Social District |
| `VybeLockedCreatorRoot` (etc.) | Empty/group | — | hidden via script |

See also `Docs/PHASE_8_SOCIAL_DISTRICT.md` for full Social District names.

## Wiring order

1. Spawn + recovery (must work first).
2. Directory + check-in + portal (+ optional landmarkMesh).
3. Pulse Challenge pads.
4. Optional ambience AudioGizmo + audio zone.
5. Social District hub + locked roots.
6. Enable `debugLogs` only while testing.

## Persistent Variables (Systems tab — UI only)

There is **no** supported `horizon/editor` API to create Persistent Variables. `EditorAPI` can spawn/wire entities and set script prop overrides (`setScriptVariable`); it cannot register Systems → Persistent Variables. Runtime `persistentStorage.getPlayerVariable` / `setPlayerVariable` only read/write keys that already exist in the editor.

**Owner must register keys in Desktop Editor:**

1. Open **Create** → **Systems** tab.
2. Find **Persistent Variables** (or create a Variable Group first if the UI requires one).
3. Click **Add Variable**.
4. Enter the exact name below; leave default/empty initial value.
5. Save the world.

| Key | Used by | Notes |
|-----|---------|-------|
| `vybe_checkin_count` | `VybeSocialCheckIn` | Required for check-in persistence |

If Preview logs that a variable was deleted or never existed, re-check the Systems tab spelling (exact match, case-sensitive). Some Meta docs/examples use `GroupName:VariableName`; this world’s scripts use the bare keys above — register the name to match the string passed to `getPlayerVariable` / `setPlayerVariable`.

## Do not

- Attach `VybeDebug.ts` (helper only).
- Build visible dead event-stage / unlocked fake districts.
- Invent UI panels (`horizon/ui` not in this world).
- Invent editor APIs to create Persistent Variables (not in `horizon_editor.d.ts`).
