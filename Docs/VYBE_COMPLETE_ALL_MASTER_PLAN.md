# Vybe Social — Complete All Master Plan

**World:** `1192248460643536` · **Scope:** All five tracks — polish, games, visual wow, release, parity  
**Rule:** One Meta AI job at a time → compile → Preview → next.

---

## Track 1 — Release stability (do first)

| Step | Action | Owner |
|------|--------|-------|
| 1.1 | Confirm zero runtime `horizon/editor`; editor trio in Editor Scripts only | Cursor done on disk |
| 1.2 | Delete empty `Script1`/`Script2`; blank `VybeSocialDistrictWire` removed from runtime | Done |
| 1.3 | Register persistent vars (see parity doc) | Systems UI |
| 1.4 | PROMPT 9 optimize + PROMPT 10 release audit | Meta Gen AI |
| 1.5 | Multiplayer soak T17–T18 | Preview |
| 1.6 | Publish checklist complete | Owner |

---

## Track 2 — World polish + social depth

| Step | Action |
|------|--------|
| 2.1 | PROMPT 8 visual polish — Plaza + Hub |
| 2.2 | Run `VybeSocialDistrictWire` if district props empty |
| 2.3 | Hub: conversation pads, gather mesh flash, directory |
| 2.4 | Safety Help + Calm Space readable signs (no fake features) |
| 2.5 | Interest selection (opt-in, horizon-native — new script only after UI job scoped) |

---

## Track 3 — Mini-games + engagement

| Game | Script | Zone | Status |
|------|--------|------|--------|
| Pulse Challenge | `VybePulseChallenge` | Plaza | Wired |
| Scavenger Hunt | `ScavengerHunt` | Discovery Boulevard | **Wire props** |
| Jump Pad | `JumpPad` | Game Lounge path | **Wire props** |
| Celebration | `CelebrationButton` | Live Venue / gather | **Wire props** |
| Vybe Match | *not yet* | Game Lounge | Phase 3 script |
| Pulse Rhythm | *not yet* | Game Lounge | Phase 3 script |

**Wire ScavengerHunt (Discovery):**

- Entity `VybeScavengerHunt` → attach `ScavengerHunt`
- `startTrigger`, `item1Trigger`–`item3Trigger`, `scoreboard` (Text), optional `rewardEffect` (Particle)
- Register `scavengerItem1`–`3` in Systems

---

## Track 4 — Visual wow + art

| Step | Action |
|------|--------|
| 4.1 | Import Kenney OBJs from `horizon-assets/source/kenney/` |
| 4.2 | Replace graybox trimeshes in Plaza + Hub first |
| 4.3 | Meta Gen AI mesh prompts per zone (one asset family per job) |
| 4.4 | `DayNightCycle` — wire sun/key lights for mood (optional) |
| 4.5 | Zone polish prompts 20–24 in master queue |

---

## Track 5 — Unity parity + exceed

See [VYBE_UNITY_TO_HORIZON_PARITY.md](VYBE_UNITY_TO_HORIZON_PARITY.md).

**Exceed Unity by:** connected 10-zone map, drop-in MP social, coop Pulse, district portal loop, scavenger quest, safety/calm, event venue shell — all without fake mobile-app UI.

---

## Execution order (single queue)

```
Stabilize → Polish 8 → Wire new games → Kenney art → Zone polish 20-24 → Optimize 9 → Audit 10 → Publish
```

Meta prompts: [VYBE_META_GEN_AI_MASTER_QUEUE.md](VYBE_META_GEN_AI_MASTER_QUEUE.md)

---

## What “complete” means

- All tracks above checked  
- Zero compile errors  
- T01–T25 Pass with evidence  
- No fake social network buttons  
- Looks premium, plays coherently, exceeds Unity **honestly**
