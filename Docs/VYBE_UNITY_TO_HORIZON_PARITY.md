# Unity → Horizon Parity (Honest)

**Goal:** Match Unity’s best core experiences, then **exceed** with Horizon-native social depth — not fake 1:1 ports.

## Cannot port (hide or replace)

| Unity feature | Why | Horizon replacement |
|---------------|-----|---------------------|
| REST feed `/api/feed` | No `fetch` in runtime | In-world check-in, gather, session counters, TextGizmo boards |
| Socket.io realtime | No WebSocket client | `NetworkEvent` broadcast |
| Custom login / Bearer session | No external auth in-world | Meta identity + `player.name` |
| Private messaging threads | Policy + no API | Gather pads + native Meta social |
| Unity-link / Meta-link API | Backend gap | N/A in-world |
| Achievements API | Not implemented | Session quests + persistent vars where registered |
| XRI / OpenXR locomotion | Different engine | Horizon locomotion (built-in) |
| URP / procedural C# factories | C# only | Editor construction + imported art |
| Photon / Netcode | Absent in Unity repo | Horizon ownership + NetworkEvent |

## Parity or better (ship in Horizon)

| Unity intent | Horizon status | Exceed how |
|--------------|----------------|------------|
| Hub / plaza arrival | Wired (`VybeSpawnRecovery`, graybox) | Premium art, Kenney, lighting polish |
| Directory / wayfinding | `VybeWorldDirectory` | 10-zone shell + signs |
| Social check-in | `VybeSocialCheckIn` + persistent var | Hub gather + district loop |
| Coop mini-game | `VybePulseChallenge` | Add Match + Rhythm after lounge built |
| Portals | `VybePortalPad` + district portals | Return routes + cooldowns |
| Ambience | `VybeAudioEnvironment` | Zone audio + hub atmosphere |
| Scavenger / discovery | **New** `ScavengerHunt` (Meta-added) | Wire in Discovery Boulevard |
| Celebration / feedback | **New** `CelebrationButton` | Stage + gather moments |
| Jump / movement fun | **New** `JumpPad` | Game Lounge paths |
| Day/night mood | **New** `DayNightCycle` | Global lighting controller |
| Ambient NPC motion | **New** `RoamingBot` | Hub greeter (waypoints required) |

## “More than Unity” (Horizon-only wins)

1. **Instant multiplayer social loops** — no APK install; drop-in via Horizon  
2. **10-zone connected destination** — Unity had sparse scenes; Horizon shell is a full map  
3. **Coop Pulse with ownership transfer** — built for instance sync  
4. **Persistent visit counts** — `vybe_checkin_count` per player  
5. **Safety + Calm zones** — comfort by design  
6. **Live venue + creator district shells** — ready for events without Unity rebuild  

## Persistent Variables to register (Systems UI)

| Key | Used by |
|-----|---------|
| `vybe_checkin_count` | `VybeSocialCheckIn` |
| `scavengerItem1` | `ScavengerHunt` (if wired) |
| `scavengerItem2` | `ScavengerHunt` |
| `scavengerItem3` | `ScavengerHunt` |

Register exact spelling before Preview.
