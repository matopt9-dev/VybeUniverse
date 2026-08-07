# Meta AI — Arrival plaza foundation (Phase 5)

World ID: **1192248460643536**. Build a cohesive **arrival plaza only** — not a full city.

## Prompt — Plaza composition

Build a polished arrival plaza for Vybe Social Horizon Edition:

1. `VybeWelcomeLandmark` — strong brand silhouette, readable at distance, dark atmospheric plaza lighting.
2. Floor plaza large enough for VR walking (approx 25m).
3. `VybeSpawnPoint` at landmark front.
4. `VybeRecoveryVolume` trigger under plaza and voids.
5. Directory area with `VybeDirectoryTrigger` (+ optional text sign).
6. Social circle with `VybeCheckInTrigger`.
7. Pulse activity pads A/B/C + start/leave/reset triggers, clearly labeled by placement.
8. Portal pad trigger + distant `VybePortalDestination` spawn.
9. Name every entity exactly as in ARRIVAL_PLAZA_BUILD_MANIFEST.
10. If an event stage exists, keep it **hidden and noninteractive**.

Do not create district streets, shops, fake feeds, or marketplace props. Do not dump entire Unity city assets.

After geometry, attach scripts per `04-vertical-slice-wiring.md` and preserve existing `VybeSpawnRecovery` / `VybeBootstrapSmoke` wiring.
