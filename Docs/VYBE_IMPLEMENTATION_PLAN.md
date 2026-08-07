# Vybe Implementation Plan (Dependency-Aware)

**Principle:** Environment shell first → wire existing systems → then expand features.  
**Never** stack dozens of untested scripts.

## Phase status

| Phase | Name | Status |
|-------|------|--------|
| 0 | Forensics + docs | **Implemented, awaiting editor validation** of live scene |
| 1 | World architecture / zones | **Not started** (coordinate plan ready) |
| 2 | Core systems expansion | Partial — preserve 9 scripts; add only as needed |
| 3–14 | Flow, social, games, UI, art, MP, safety, perf, Gen AI protocol, QA, release | **Not started** or blocked on editor |

## Ordered execution (do not skip)

### Gate A — Editor health + audit (Meta AI Job VYBE-META-001)
1. Owner opens world `1192248460643536`.  
2. Paste **VYBE-META-001** (read-only audit).  
3. Save audit report into `test-reports/` (owner paste).  

### Gate B — Repair blockers
1. Confirm graybox is only in Editor Scripts (done on disk).  
2. Compile Scripts panel — fix any errors.  
3. Register Persistent Variable `vybe_checkin_count`.  

### Gate C — Validation pad (VYBE-ENV-002)
Temporary 10×10 pad + doorway + bench. Preview walk.  

### Gate D — Arrival Plaza vertical slice (VYBE-ENV-003 + run graybox)
1. Run `VybeArrivalPlazaGraybox` **once**.  
2. Preview: spawn, directory, check-in, pulse, portal.  
3. Record pass in `VYBE_TEST_MATRIX.md`.  

### Gate E — Hierarchy + quarantine
Create `VYBE_WORLD_ROOT` + zone parents; reparent plaza; quarantine junk.  

### Gate F — Pathways + Social Pulse Hub shell
Floors/paths only; no mini-game sprawl.  

### Gate G — Kenney import + art replace graybox
Import 6 OBJs; place intentionally; collision pass.  

### Gate H — Remaining zones (one district at a time)
Creator → Live Venue → Game Lounge → Discovery → Expression → Calm → Safety → Portals.  
Each zone: floor → shell → landmark → path → validate → STOP.  

### Gate I — Interactions layer
Wire doors/portals/UI only after shell for that zone passes.  

### Gate J — Social features / mini-games
Expand Pulse; then Match / Rhythm / Creator Quest **one game at a time**.  

### Gate K — Multiplayer / safety / performance / release docs
Only after populated Preview.

## Smallest release-blocking issue (now)

**No verified Arrival Plaza geometry + unwired interactables.**  
Scripts exist; destination does not. Fix with Gate B–D before any new gameplay scripts.

## What Cursor will keep doing between owner Meta AI runs

- Maintain prompt queue + coordinate manifest  
- Repair TypeScript when owner pastes compiler errors  
- Mirror validated scripts repo ↔ world folders when paths are accessible  
- Refuse fake social backends  

## What Cursor will not claim

- That Meta Gen AI ran  
- That Preview passed  
- That the world is publishable  
