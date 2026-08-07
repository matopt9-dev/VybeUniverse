# Horizon systems test plan

**Owner Preview / multiplayer:** PENDING OWNER PREVIEW unless explicitly signed off.

## Compile gate (agent)

- [ ] `tsc -p tsconfig.smoke.json` PASS (TS 4.7.4)
- [ ] All `systems/*.ts` synced to world `scripts/`

## Manual Preview (owner)

| # | Test | Expected | Result |
|---|------|----------|--------|
| 1 | Join world | Spawn at `VybeSpawnPoint` | PENDING OWNER |
| 2 | Fall into recovery | Teleport back to spawn | PENDING OWNER |
| 3 | Enter directory trigger | Popup + optional sign text | PENDING OWNER |
| 4 | Enter portal pad | Teleport to `VybePortalDestination` | PENDING OWNER |
| 5 | Enter check-in | Greeting popup; session count | PENDING OWNER |
| 6 | Pulse: START → pads A/B/C | Scoreboard updates; success popup | PENDING OWNER |
| 7 | Pulse: leave / reset | State clears | PENDING OWNER |
| 8 | Two players Pulse | Shared pads / score awareness | PENDING OWNER |
| 9 | Late join Pulse | Can join mid-round | PENDING OWNER |
| 10 | Mobile / VR trigger walk-in | All interactions work without UI clicks | PENDING OWNER |

## Pass criteria

- **Code PASS:** local compile + sync complete.
- **Preview PASS:** only after owner marks rows above.
- **Multiplayer PASS:** only after two-device or multiplayer Preview.

Do not claim world complete until Preview, multiplayer, performance, and publishing gates pass.
