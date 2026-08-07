# ONE PASTE — Code and act (include world scripts ON)

You are repairing Vybe Social world 1192248460643536. Execute ALL steps below in order. Stop only if compile fails mid-way; then report exact errors.

## STEP A — Kill compile errors
1. If scripts named VybeArrivalPlazaGraybox, VybeWorldShellZones, or VybeSocialDistrictWire exist under runtime Scripts, DELETE them from Scripts only.
2. They must remain ONLY in Editor Scripts (do not delete Editor Scripts copies).
3. Detach those scripts from any entity if attached as components.
4. Recompile. Require zero TypeScript errors and zero horizon/editor imports in runtime Scripts.

## STEP B — Wire Social District
Prefer: run Editor Script VybeSocialDistrictWire once if available.
Otherwise create missing entities with EXACT names and assign on entity VybeSocialDistrict:
- directoryTrigger → VybeSocialDistrictDirectoryTrigger
- directoryText → VybeSocialDistrictDirectorySign
- gatherTrigger → VybeSocialDistrictGatherTrigger
- gatherSign → VybeSocialDistrictGatherSign
- gatherMesh → VybeSocialDistrictGatherMesh
- toDistrictTrigger → VybeToSocialDistrictTrigger
- districtSpawn → VybeSocialDistrictSpawn
- returnTrigger → VybeSocialDistrictReturnTrigger
- returnSpawn → VybeSpawnPoint
- lockedCreatorRoot → VybeLockedCreatorRoot
- lockedGameRoot → VybeLockedGameRoot
- lockedEventRoot → VybeLockedEventRoot
- lockedMarketplaceRoot → VybeLockedMarketplaceRoot
- checkInCooldownSeconds → 8
- portalCooldownSeconds → 1.5
- debugLogs → false
Place hub interactables near (0,0,55). Place VybeToSocialDistrictTrigger near (0,1,18) on Arrival Plaza. Do not leave required Entity props empty.

## STEP C — Pulse orphans
Move PulseStartTrigger, PulseLeaveTrigger, PulseScoreboard (and other Pulse* without Vybe prefix) under _VYBE_LEGACY_QUARANTINE, disable visibility/collision. Keep VybePulseStart/Leave/Reset/PadA/B/C and VybePulseScoreboard.

## STEP D — Release hygiene
On VybeBootstrap set debugLogs → false (or detach). Confirm VybeSpawnRecovery, VybeWorldDirectory, VybeSocialCheckIn, VybePulseChallenge, VybePortalPad props still wired. Recompile.

## STEP E — Report
List: compile result, Social District null props remaining, entities created, orphans quarantined. Do not publish. Do not invent APIs. Do not modify working gameplay script source unless required to compile.
