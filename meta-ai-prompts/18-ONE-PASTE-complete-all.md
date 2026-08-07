# ONE PASTE — Complete All (Phases 18–27)

**Mode:** Code and act · Scripts in context ON  
**Run after:** Preview was green; execute in order or as one block if Meta allows.

```
PHASE A — STABILIZE
- Remove VybeSocialDistrictWire from runtime Scripts only (keep in Editor Scripts).
- Delete empty Script1.ts, Script2.ts if present.
- Recompile until zero errors.

PHASE B — WIRE NEW GAMEPLAY (preserve Vybe* wiring)
- Discovery: VybeScavengerHunt + ScavengerHunt props (start, item1-3 triggers, scoreboard Text, optional reward Particle).
- Game Lounge: JumpPad host + trigger wired.
- Hub or Venue: CelebrationButton with particle + audio props.
- Optional Hub: RoamingBot + 4 waypoints.
- Register Systems persistent vars: vybe_checkin_count, scavengerItem1, scavengerItem2, scavengerItem3.

PHASE C — POLISH
- Plaza + Hub visual polish (bright premium futuristic, readable signs, soft lights).
- Discovery + remaining zone shells consistent; locked roots hidden.

PHASE D — OPTIMIZE + AUDIT
- Quarantine/delete confirmed Pulse orphans (PulseStartTrigger etc., not VybePulse*).
- Optimize lights/meshes/audio stacking.
- Final audit: zero compile errors, zero empty required props, working spawn/recovery/directory/check-in/district/pulse/portals/scavenger.

Report: compile result, props still null, entities created, blockers for publish. Do not claim published.
```

After Pass → implement Prompts 28–30 (Match, Rhythm, Interest UI) per Docs/VYBE_COMPLETE_ALL_MASTER_PLAN.md.
