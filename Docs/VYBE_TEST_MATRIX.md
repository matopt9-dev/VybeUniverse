# Vybe Test Matrix

**World:** `1192248460643536`  
Fill Actual / Pass-Fail / Error log after Preview. Cursor cannot claim Preview Pass.

| Test ID | Feature | Starting condition | Action | Expected result | Actual | P/F | Error log | Repair | Retest |
|---------|---------|--------------------|--------|-----------------|--------|-----|-----------|--------|--------|
| T01 | Compile | Scripts open | Compile | Zero errors; no horizon/editor in Scripts | | | | | |
| T02 | Spawn | Preview join | Appear | At VybeSpawnPoint above floor | | | | | |
| T03 | Locomotion | Spawned | Walk | Smooth movement | | | | | |
| T04 | Recovery | Spawned | Fall into VybeRecoveryVolume | Teleport to spawn | | | | | |
| T05 | Directory | Near VybeDirectoryTrigger | Enter trigger | Directory popup / sign | | | | | |
| T06 | To District | Near VybeToSocialDistrictTrigger | Enter | Teleport to VybeSocialDistrictSpawn | | | | | |
| T07 | District text | In district | Enter directory trigger | District directory popup/text | | | | | |
| T08 | Gather | Enter gather trigger | Check-in | Gather popup; optional mesh flash | | | | | |
| T09 | Plaza check-in | Enter VybeCheckInTrigger | Check-in | Popup; persistence if var registered | | | | | |
| T10 | Pulse start | Enter VybePulseStart | Start | Instructions; active | | | | | |
| T11 | Pulse score | Light A/B/C | Complete | Score +1; scoreboard update | | | | | |
| T12 | Pulse leave | Active | Enter Leave | Left; reset if empty | | | | | |
| T13 | Portal pad | Enter VybePortalPadTrigger | Teleport | Arrive VybePortalDestination | | | | | |
| T14 | Portal cooldown | Re-enter immediately | Blocked | No teleport loop | | | | | |
| T15 | Return route | District return trigger | Enter | Arrive VybeSpawnPoint | | | | | |
| T16 | Audio | Ambience wired | Enter zone | Comfortable audio; no stack | | | | | |
| T17 | Second player | MP Preview | Join | Both spawn safely | | | | | |
| T18 | MP Pulse | 2 players | Coop pads | Stable sync; no double reward exploit | | | | | |
| T19 | Orphan Pulse | Legacy Pulse* quarantined | Walk near orphans | No unintended starts | | | | | |
| T20 | Props | Inspector | Check required | No empty required Entity props | | | | | |
| T21 | Trap check | Explore | All routes | No soft-lock | | | | | |
| T22 | Spawn geometry | Join | Spawn | Not inside mesh | | | | | |
| T23 | Signage | View signs | Read | Readable contrast | | | | | |
| T24 | Performance | Walk world | Observe | Stable frame feel | | | | | |
| T25 | Publish preflight | Editor publish UI | Validate | No critical blockers | | | | | |
