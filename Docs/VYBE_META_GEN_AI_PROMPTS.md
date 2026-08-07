# Vybe Meta Gen AI Prompts — Code and Act

**World:** Vybe Social `1192248460643536`  
**Settings:** Mode `Code and act` · Include world scripts in context · **ON**  
**Rule:** One prompt → apply → compile → Preview check → next.

---

## PROMPT 1 — REPAIR COMPILATION

```
Inspect Scripts panel and Editor Scripts panel for VybeArrivalPlazaGraybox and VybeWorldShellZones.

If either file appears under runtime Scripts (world scripts), REMOVE it from Scripts only. Those files import horizon/editor and must exist ONLY under Editor Scripts.

Do not delete the Editor Scripts copies.
Do not modify VybeSpawnRecovery, VybePlayerLifecycle, VybeWorldDirectory, VybeSocialCheckIn, VybePulseChallenge, VybePortalPad, VybeAudioEnvironment, VybeSocialDistrict, or VybeBootstrapSmoke source unless needed to compile.

Detach VybeArrivalPlazaGraybox or VybeWorldShellZones from any entity if attached as components.

Recompile. Report exact remaining TypeScript errors. Stop.
```

---

## PROMPT 2 — VERIFY ARRIVAL PLAZA (reuse, don’t duplicate)

```
Inspect hierarchy for 01_ARRIVAL_PLAZA, VybePlazaFloor, VybeWelcomeLandmark, VybeSpawnPoint, VybeRecoveryVolume, VybeDirectory, VybeSocialCheckIn, VybePortalPad, VybePulseChallenge.

Reuse existing objects. Do not create duplicates of those exact names.

If plaza geometry is missing, rebuild ONLY missing objects from Docs/VYBE_ARRIVAL_PLAZA_BUILD_SPEC positions. Preserve working script hosts and property wiring.

Compile. Stop. Do not build other districts in this job.
```

---

## PROMPT 3 — VERIFY WORLD SHELL

```
Inspect for VYBE_WORLD_ROOT, zones 02_SOCIAL_PULSE_HUB through 10_EVENT_PORTAL_CONCOURSE, and 11_PATHWAYS path meshes Path_P1 through Path_P9.

If missing, create missing zone floors/landmarks/signs/paths per VYBE_WORLD_SHELL_BUILD_SPEC. Do not invent horizon/editor runtime scripts. Do not duplicate existing exact names.

Parent new objects under correct zone folders. Compile. Stop.
```

---

## PROMPT 4 — CONFIGURE SOCIAL DISTRICT (CRITICAL)

```
Inspect component VybeSocialDistrict on entity VybeSocialDistrict and its propsDefinition.

Create any missing entities with EXACT names:
- VybeSocialDistrictDirectoryTrigger (Trigger) at approx (-6,1,51)
- VybeSocialDistrictDirectorySign (Text) 
- VybeSocialDistrictGatherTrigger (Trigger) at (0,1,55)
- VybeSocialDistrictGatherSign (Text)
- VybeSocialDistrictGatherMesh (Trimesh pad) at (0,0.08,55)
- VybeSocialDistrictSpawn (SpawnPoint) at (0,0.15,47)
- VybeToSocialDistrictTrigger (Trigger) at (0,1,18) on Arrival Plaza
- VybeSocialDistrictReturnTrigger (Trigger) at (0,1,67)

Prefer running Editor Script VybeSocialDistrictWire if present instead of recreating.

On entity VybeSocialDistrict assign:
directoryTrigger → VybeSocialDistrictDirectoryTrigger
directoryText → VybeSocialDistrictDirectorySign
gatherTrigger → VybeSocialDistrictGatherTrigger
gatherSign → VybeSocialDistrictGatherSign
gatherMesh → VybeSocialDistrictGatherMesh
toDistrictTrigger → VybeToSocialDistrictTrigger
districtSpawn → VybeSocialDistrictSpawn
returnTrigger → VybeSocialDistrictReturnTrigger
returnSpawn → VybeSpawnPoint
lockedCreatorRoot → VybeLockedCreatorRoot
lockedGameRoot → VybeLockedGameRoot
lockedEventRoot → VybeLockedEventRoot
lockedMarketplaceRoot → VybeLockedMarketplaceRoot
checkInCooldownSeconds → 8
portalCooldownSeconds → 1.5
debugLogs → false

No required Entity prop may remain empty. Compile. Report any still-null props. Stop.
```

---

## PROMPT 5 — CLEAN PULSE DUPLICATES

```
Audit entities named PulseStartTrigger, PulseLeaveTrigger, PulseScoreboard, and any Pulse* without Vybe prefix.

Preserve VybePulseChallenge wiring to VybePulseStart, VybePulseLeave, VybePulseReset, VybePulsePadA/B/C, VybePulseScoreboard.

Move confirmed unreferenced legacy Pulse* under _VYBE_LEGACY_QUARANTINE, disable visibility/collision. Do not delete until after Preview Pass of Pulse. Then delete quarantined orphans only.

Compile. Stop.
```

---

## PROMPT 6 — VERIFY ALL SCRIPT CONNECTIONS

```
Audit property assignments for:
VybeSpawnSystem→VybeSpawnRecovery (spawnPoint, recoveryTrigger)
VybePlayerLifecycle
VybeDirectory→VybeWorldDirectory (directoryTrigger, directoryText, landmarkMesh)
VybeSocialCheckIn (checkInTrigger, signText)
VybePulseChallenge (all VybePulse* triggers + scoreboard)
VybePortalPad (padTrigger, destinationSpawn)
VybeAmbience→VybeAudioEnvironment
VybeSocialDistrict (all required props from Prompt 4)

Repair null required Entity props only. Set all debugLogs false for release. Compile. List any remaining null required props. Stop.
```

---

## PROMPT 7 — TEST GAMEPLAY (operator-assisted)

```
Enter Preview. Test: spawn at VybeSpawnPoint; fall recovery; directory popup; check-in; walk to VybeToSocialDistrictTrigger → district spawn; gather trigger; return portal; Pulse start/pads/leave; portal pad; no console errors.

Fix each reproducible failure with minimal changes. Retest that failure. Do not redesign the world. Report Pass/Fail per test. Stop.
```

---

## PROMPT 8 — VISUAL POLISH

```
Polish Vybe Social Arrival Plaza and Social Pulse Hub only: align materials to bright premium futuristic (neutral floors, cyan/teal accents, warm landmark), improve sign readability, soft lighting, no flashing, no oversized floating text, no blocked doors. Preserve all gameplay entities and script wiring. Do not add fake UI buttons. Stop.
```

---

## PROMPT 9 — OPTIMIZE

```
Optimize for Horizon performance: remove verified unused duplicates in quarantine, reduce redundant lights/meshes if over budget, ensure audio does not stack, keep pathways collidable. Preserve visual identity and all working interactions. Compile. Stop.
```

---

## PROMPT 10 — FINAL RELEASE AUDIT

```
Final publication audit checklist:
- Zero TS compile errors
- Zero runtime scripts importing horizon/editor
- Zero empty required script Entity props
- Working spawn, recovery, directory, check-in, Social District portals, Pulse, portal pad
- No blocked routes; no spawn in geometry
- No player-facing AI/Cursor/debug text
- Bootstrap debugLogs false or detached
- Persistent Variable vybe_checkin_count exists

List any remaining blockers only. Do not claim publish. Stop.
```

---

## Preferred alternative to Prompt 4

**Editor Scripts → Run `VybeSocialDistrictWire` once**, then still run Prompt 6 to verify.
