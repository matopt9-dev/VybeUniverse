# Meta AI — Vertical slice entity attach (Phase 4)

World ID: **1192248460643536**. Use exact entity names. Scripts already in world `scripts/`.

## Prompt A — Directory

Create trigger volume named `VybeDirectoryTrigger` near the welcome landmark. Create empty entity `VybeDirectory`. Attach script `VybeWorldDirectory`. Set prop `directoryTrigger` to `VybeDirectoryTrigger`. Optionally create Text Gizmo `VybeDirectorySign` and set prop `directoryText`. Leave `debugLogs` false.

## Prompt B — Portal pad

Create trigger `VybePortalPadTrigger` on a floor pad. Create Spawn Point `VybePortalDestination` at a lookout 10–20m away. Create empty `VybePortalPad`, attach `VybePortalPad`, wire `padTrigger` and `destinationSpawn`. Optional: AudioGizmo / ParticleGizmo for feedback.

## Prompt C — Social check-in

Create trigger `VybeCheckInTrigger` in a gathering circle. Empty `VybeSocialCheckIn`, attach `VybeSocialCheckIn`, wire `checkInTrigger`. Optional Text Gizmo sign and AudioGizmo.

## Prompt D — Pulse Challenge

In activity zone create triggers: `VybePulseStart`, `VybePulseLeave`, `VybePulseReset`, `VybePulsePadA`, `VybePulsePadB`, `VybePulsePadC`. Optional Text Gizmo `VybePulseScoreboard`. Empty `VybePulseChallenge`, attach script, wire all trigger props. Optional pad mesh entities for color; optional success AudioGizmo/ParticleGizmo.

## Prompt E — Lifecycle (optional)

Empty `VybePlayerLifecycle`, attach `VybePlayerLifecycle`.

## Do not ask Meta AI to

- Create fake message feeds, shops, purchases, or rewards
- Unhide event stage as interactive
- Import Unity scenes or invent `horizon/ui` scripts
