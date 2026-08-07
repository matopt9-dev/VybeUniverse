# Phase 7 QA matrix — 2026-07-17

**World:** `1192248460643536`  
**Compile:** PASS (`phase6-8-compile-2026-07-17.md`)  
**Prior slice Preview:** **OWNER-REPORTED PASS** 2026-07-17 (user: “everything is green”) — not agent-observed.

Mark owner results only after real Preview / multiplayer tests of the hardened build.

| ID | Scenario | Expected | Owner | Date / notes |
|----|----------|----------|-------|--------------|
| MP-01 | First player | Spawn + systems | | |
| MP-02 | Second player | Both present | | |
| MP-03 | Late join Pulse | Can join active race | | |
| MP-04 | Disconnect | Race resets if empty | | |
| MP-05 | Authority departure | Ownership state recovers | | |
| MP-06 | Reset trigger | Clear pads | | |
| MP-07 | Rapid pads | No double success | | |
| MP-08 | Portal repeat | Cooldown holds | | |
| MP-09 | Recovery | Teleport to spawn | | |
| MP-10 | Mobile/VR | Triggers work | | |
| MP-11 | Audio overlap | Acceptable | | |
| MP-12 | Missing refs | Soft fail / popup | | |
| SD-01 | Social District portal | Plaza ↔ district | | |
| SD-02 | District gather | Real-player check-in | | |
| SD-03 | Locked districts | Hidden / noninteractive | | |

Enable `debugLogs` on Pulse / Social District while testing; disable before publish review.
