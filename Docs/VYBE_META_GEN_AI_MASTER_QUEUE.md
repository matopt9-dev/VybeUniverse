# Meta Gen AI Master Queue — Complete All

**Settings:** Code and act · Include world scripts ON · One job at a time.

## Already done (owner-reported)

- Prompts 1–7 repairs  
- Preview all green  
- Prompt 17 polish (optional — run if not done)

---

## PROMPT 18 — Stabilize scripts panel

```
Remove VybeSocialDistrictWire from runtime Scripts if present (blank stub). Keep VybeArrivalPlazaGraybox, VybeWorldShellZones, VybeSocialDistrictWire ONLY in Editor Scripts.

Delete empty Script1.ts and Script2.ts if they exist.

Recompile. Zero errors. Stop.
```

---

## PROMPT 19 — Wire Scavenger Hunt (Discovery)

```
In 06_DISCOVERY_BOULEVARD create:
- VybeScavengerStart, VybeScavengerItem1/2/3 triggers, VybeScavengerScoreboard (Text)
- Empty VybeScavengerHunt with ScavengerHunt component
Wire all props. Register persistent vars scavengerItem1, scavengerItem2, scavengerItem3 in Systems if missing.
Compile. Preview: start quest, find 3 items. Stop.
```

---

## PROMPT 20 — Wire Jump Pad + Celebration

```
In 05_GAME_LOUNGE: JumpPad trigger + JumpPad script host, wire launch force props.
In 02_SOCIAL_PULSE_HUB or 04_VYBE_LIVE_VENUE: CelebrationButton on gather/stage trigger with particle + audio props.
Compile. Stop.
```

---

## PROMPT 21 — RoamingBot greeter (optional)

```
Place RoamingBot on empty entity in Hub with 4 waypoint empties in a square path. Wire waypoint1-4. No player blocking. Compile. Stop.
```

---

## PROMPT 22 — Kenney art pass Plaza

```
Import/replace Plaza graybox trimeshes with imported Kenney commercial OBJs where scale matches. Preserve Vybe* entity names and all script wiring. Collision walkable. Stop.
```

---

## PROMPT 23 — Hub + Discovery polish

```
Polish 02_SOCIAL_PULSE_HUB and 06_DISCOVERY_BOULEVARD: materials, lighting, signage, seating. Bright premium futuristic. Preserve wiring. Stop.
```

---

## PROMPT 24 — Remaining zones shell polish

```
Polish zones 03,04,05,07,08,09,10 shells: readable signs, consistent materials, no fake interactables. Locked districts stay hidden. Stop.
```

---

## PROMPT 25 — DayNightCycle (optional)

```
Wire DayNightCycle to Global_RimLight or key StaticLights. Subtle cycle, no seizure flashing. Preserve gameplay. Stop.
```

---

## PROMPT 26 — Optimize (was 9)

```
Remove quarantined duplicates, reduce redundant lights, audio zone check, performance pass. Stop.
```

---

## PROMPT 27 — Final release audit (was 10)

```
Full checklist: compile, props, portals, spawn, MP, no debug text, persistent vars, publish blockers list only. Stop.
```

---

## PROMPT 28–30 — Future (after lounge built)

```
28: Implement VybeMatch cooperative zones (new script, Game Lounge only)
29: Implement PulseRhythm timing game (new script)
30: Interest selection opt-in UI (horizon/ui scoped job)
```

Run 28–30 only after 18–27 Pass.
