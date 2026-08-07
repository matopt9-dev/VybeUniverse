# Vybe Scene Hierarchy (Target + Expected After Construction)

**World:** `1192248460643536`  
Live hierarchy is editor-side. This is the **intended** structure after graybox + shell + district wire.

```
VYBE_WORLD_ROOT
├── 00_SYSTEMS
├── 01_ARRIVAL_PLAZA
│   ├── Arrival_ARCHITECTURE
│   ├── Arrival_FLOORS
│   ├── Arrival_FURNITURE
│   ├── Arrival_SIGNAGE
│   ├── Arrival_LIGHTING
│   ├── Arrival_INTERACTIONS
│   └── Arrival_SYSTEMS
│       ├── VybeSpawnSystem (VybeSpawnRecovery)
│       ├── VybePlayerLifecycle
│       ├── VybeBootstrap
│       ├── VybeDirectory
│       ├── VybeSocialCheckIn
│       ├── VybePortalPad
│       ├── VybePulseChallenge
│       └── VybeAmbience
├── 02_SOCIAL_PULSE_HUB
│   ├── …_FLOORS / ARCHITECTURE / SIGNAGE / LIGHTING / SPAWNS
│   ├── Hub_ConversationPad_A/B/C
│   └── Social District interactables (near hub)
│       ├── VybeSocialDistrict (script)
│       ├── VybeSocialDistrictDirectoryTrigger / Sign
│       ├── VybeSocialDistrictGatherTrigger / Sign / Mesh
│       ├── VybeSocialDistrictSpawn
│       └── VybeSocialDistrictReturnTrigger
├── 03_CREATOR_DISTRICT … 10_EVENT_PORTAL_CONCOURSE
├── 11_PATHWAYS
├── 12_GLOBAL_LIGHTING
├── 15_NAVIGATION_AND_SPAWNS
└── _VYBE_LEGACY_QUARANTINE
    └── (PulseStartTrigger, PulseLeaveTrigger, PulseScoreboard, …)
```

## Plaza interactable names (active)

`VybeSpawnPoint`, `VybeRecoveryVolume`, `VybeDirectoryTrigger`, `VybeCheckInTrigger`, `VybePortalPadTrigger`, `VybePortalDestination`, `VybePulseStart|Leave|Reset|PadA|PadB|PadC`, `VybePulseScoreboard`, `VybeToSocialDistrictTrigger`

## Quarantine / DevelopmentArchive

Move confirmed orphans under `_VYBE_LEGACY_QUARANTINE` (disabled/invisible) before delete.
