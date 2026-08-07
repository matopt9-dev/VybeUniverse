# Vybe Script Property Map

**World:** `1192248460643536`  
**Rule:** Runtime scripts import **only** `horizon/core`. Editor scripts import `horizon/editor` and live under **Editor Scripts**.

## Runtime components

| Script file | Class / register name | Imports | Layer | Expected entity | Compile (disk) |
|-------------|----------------------|---------|-------|-----------------|----------------|
| `VybeBootstrapSmoke.ts` | `VybeBootstrapSmoke` | core | Runtime | `VybeBootstrap` | OK |
| `VybeSpawnRecovery.ts` | `VybeSpawnRecovery` | core | Runtime | `VybeSpawnSystem` | OK |
| `VybePlayerLifecycle.ts` | `VybePlayerLifecycle` | core | Runtime | `VybePlayerLifecycle` | OK |
| `VybeWorldDirectory.ts` | `VybeWorldDirectory` | core | Runtime | `VybeDirectory` | OK |
| `VybeSocialCheckIn.ts` | `VybeSocialCheckIn` | core | Runtime | `VybeSocialCheckIn` | OK |
| `VybePulseChallenge.ts` | `VybePulseChallenge` | core | Runtime | `VybePulseChallenge` | OK |
| `VybePortalPad.ts` | `VybePortalPad` | core | Runtime | `VybePortalPad` | OK |
| `VybeAudioEnvironment.ts` | `VybeAudioEnvironment` | core | Runtime | `VybeAmbience` | OK |
| `VybeSocialDistrict.ts` | `VybeSocialDistrict` | core | Runtime | `VybeSocialDistrict` | OK |

## Editor-only (must NOT be in Scripts panel)

| Script file | Purpose | Imports |
|-------------|---------|---------|
| `VybeArrivalPlazaGraybox.ts` | Build plaza + wire plaza systems | `horizon/editor` |
| `VybeWorldShellZones.ts` | Zones 02–10 + pathways | `horizon/editor` |
| `VybeSocialDistrictWire.ts` | Create + wire Social District props | `horizon/editor` |

---

## Property assignments (exact)

### VybeSpawnRecovery → entity `VybeSpawnSystem`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `spawnPoint` | Entity | Yes | `VybeSpawnPoint` |
| `recoveryTrigger` | Entity | Yes | `VybeRecoveryVolume` |
| `teleportOnJoin` | Boolean | No (default true) | — |
| `enableRecovery` | Boolean | No (default true) | — |
| `debugLogs` | Boolean | No | false for release |

### VybePlayerLifecycle → `VybePlayerLifecycle`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `showWelcomePopup` | Boolean | No (default true) | |
| `debugLogs` | Boolean | No | false for release |

### VybeWorldDirectory → `VybeDirectory`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `directoryTrigger` | Entity | Yes | `VybeDirectoryTrigger` |
| `directoryText` | Entity | Optional | `VybeDirectorySign` |
| `landmarkMesh` | Entity | Optional | `VybeWelcomeLandmark` |
| `popupSeconds` | Number | No | 4 |
| `debugLogs` | Boolean | No | false |

### VybeSocialCheckIn → `VybeSocialCheckIn`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `checkInTrigger` | Entity | Yes | `VybeCheckInTrigger` |
| `signText` | Entity | Optional | `VybeCheckInSign` |
| `feedbackAudio` | Entity | Optional | AudioGizmo if present |
| `cooldownSeconds` | Number | No | 8 |
| `debugLogs` | Boolean | No | false |

**Systems UI:** Persistent Variable `vybe_checkin_count` must exist.

### VybePulseChallenge → `VybePulseChallenge`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `startTrigger` | Entity | Yes | `VybePulseStart` |
| `leaveTrigger` | Entity | Yes | `VybePulseLeave` |
| `resetTrigger` | Entity | Yes | `VybePulseReset` |
| `padATrigger` | Entity | Yes | `VybePulsePadA` |
| `padBTrigger` | Entity | Yes | `VybePulsePadB` |
| `padCTrigger` | Entity | Yes | `VybePulsePadC` |
| `padAMesh` | Entity | Optional | `VybePulsePadMeshA` (or graybox name) |
| `padBMesh` | Entity | Optional | pad mesh B |
| `padCMesh` | Entity | Optional | pad mesh C |
| `scoreboardText` | Entity | Optional | `VybePulseScoreboard` |
| `successAudio` | Entity | Optional | — |
| `successFx` | Entity | Optional | — |
| `successTimeoutSeconds` | Number | No | 8 |
| `instructionsSeconds` | Number | No | 5 |
| `padCooldownSeconds` | Number | No | 0.35 |
| `maxParticipants` | Number | No | 32 |
| `debugLogs` | Boolean | No | false |

**Do not wire:** `PulseStartTrigger`, `PulseLeaveTrigger`, `PulseScoreboard` (legacy orphans).

### VybePortalPad → `VybePortalPad`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `padTrigger` | Entity | Yes | `VybePortalPadTrigger` |
| `destinationSpawn` | Entity | Yes | `VybePortalDestination` |
| `feedbackAudio` | Entity | Optional | — |
| `feedbackFx` | Entity | Optional | — |
| `padMesh` | Entity | Optional | portal pad mesh |
| `cooldownSeconds` | Number | No | 1.5 |
| `debugLogs` | Boolean | No | false |

### VybeAudioEnvironment → `VybeAmbience`

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `ambienceAudio` | Entity | Optional until AudioGizmo exists | AudioGizmo |
| `audioZoneTrigger` | Entity | Optional | Trigger |
| `playOnStart` | Boolean | No | false until audio assigned |
| `stopOnEmptyWorld` | Boolean | No | — |
| `stopOnEmptyZone` | Boolean | No | — |
| `debugLogs` | Boolean | No | false |

### VybeSocialDistrict → `VybeSocialDistrict` (CRITICAL)

| Prop | Type | Required | Expected object |
|------|------|----------|-----------------|
| `directoryTrigger` | Entity | **Yes** | `VybeSocialDistrictDirectoryTrigger` |
| `directoryText` | Entity | Optional | `VybeSocialDistrictDirectorySign` |
| `gatherTrigger` | Entity | **Yes** | `VybeSocialDistrictGatherTrigger` |
| `gatherSign` | Entity | Optional | `VybeSocialDistrictGatherSign` |
| `gatherAudio` | Entity | Optional | AudioGizmo |
| `gatherMesh` | Entity | Optional | `VybeSocialDistrictGatherMesh` |
| `toDistrictTrigger` | Entity | **Yes** | `VybeToSocialDistrictTrigger` |
| `districtSpawn` | Entity | **Yes** | `VybeSocialDistrictSpawn` |
| `returnTrigger` | Entity | **Yes** | `VybeSocialDistrictReturnTrigger` |
| `returnSpawn` | Entity | **Yes** | `VybeSpawnPoint` (preferred) or `VybeSocialDistrictReturnSpawn` |
| `lockedCreatorRoot` | Entity | Optional | `VybeLockedCreatorRoot` |
| `lockedGameRoot` | Entity | Optional | `VybeLockedGameRoot` |
| `lockedEventRoot` | Entity | Optional | `VybeLockedEventRoot` |
| `lockedMarketplaceRoot` | Entity | Optional | `VybeLockedMarketplaceRoot` |
| `checkInCooldownSeconds` | Number | No | 8 |
| `portalCooldownSeconds` | Number | No | 1.5 |
| `debugLogs` | Boolean | No | false |

### VybeBootstrapSmoke → `VybeBootstrap`

| Prop | Type | Notes |
|------|------|-------|
| `debugLogs` | Boolean | Set **false** or detach entity for publication |

---

## Component Entity: `VybeSocialDistrict`

**Attached Component:** `VybeSocialDistrict`

**Property Assignments:**

- `directoryTrigger` → `VybeSocialDistrictDirectoryTrigger`
- `directoryText` → `VybeSocialDistrictDirectorySign`
- `gatherTrigger` → `VybeSocialDistrictGatherTrigger`
- `gatherSign` → `VybeSocialDistrictGatherSign`
- `gatherAudio` → *(optional AudioGizmo or leave empty)*
- `gatherMesh` → `VybeSocialDistrictGatherMesh`
- `toDistrictTrigger` → `VybeToSocialDistrictTrigger`
- `districtSpawn` → `VybeSocialDistrictSpawn`
- `returnTrigger` → `VybeSocialDistrictReturnTrigger`
- `returnSpawn` → `VybeSpawnPoint`
- `lockedCreatorRoot` → `VybeLockedCreatorRoot`
- `lockedGameRoot` → `VybeLockedGameRoot`
- `lockedEventRoot` → `VybeLockedEventRoot`
- `lockedMarketplaceRoot` → `VybeLockedMarketplaceRoot`
- `checkInCooldownSeconds` → `8`
- `portalCooldownSeconds` → `1.5`
- `debugLogs` → `false`
