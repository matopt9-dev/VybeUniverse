# FUTURISTIC LOOK — Meta Horizon Execution Pack

**World:** Vybe Social `1192248460643536`  
**Goal:** Arrival Plaza + Social Hub feel like a premium futuristic destination — not boxes.

Cursor cannot edit the Meta viewport. These prompts run in Desktop Editor **Code and act**.

---

## Futuristic look (Horizon-safe)

| Element | Do this |
|---------|---------|
| Architecture | Soft white curved shells, tall thin pylons, open canopies |
| Accents | Cyan `#2EC4D6` + warm gold `#E8A838` only |
| Floors | Continuous light stone / pale concrete — no seams or holes |
| Lighting | Soft daylight key + amber path lamps; no purple, no flash |
| Water | One calm fountain or water ribbon (not ocean simulation) |
| Skyline | Distant simplified silhouettes only (non-collidable) |
| Density | Few strong landmarks > many tiny props |
| Hide | Every unfinished district, Cube, meshless Trimesh |

**Avoid:** cyberpunk black maze, neon spam, floating text, random cubes, dark unreadable paths.

---

## Paste order (Code and act · scripts ON)

### F0 — Clear the mess
```
Hide unfinished zones and quarantine meshless Trimeshes plus Cube Object Copy props under _VYBE_LEGACY_QUARANTINE without deleting working Vybe spawn or triggers.
```

### F1 — Futuristic plaza shell
```
Rebuild Arrival Plaza as bright futuristic waterfront: continuous pale floor, white curved walls with path openings, gold landmark monolith, cyan canopy, soft daylight.
```

### F2 — Social furniture
```
Add modern conversation seating, cyan parasols, palm planters, and a slim fountain; everything grounded; keep wide open walkways to Hub.
```

### F3 — Atmosphere
```
Add soft key light, amber path lamps, readable VYBE signage, gentle ambient fill; no flashing; no purple; no oversized floating text.
```

### F4 — Hub futurism
```
Polish Social Pulse Hub as futuristic garden plaza: continuous floor, cyan landmark ring, seating circles, palms, soft lights, clear path back to Arrival.
```

### F5 — Skyline illusion
```
Add distant non-collidable white and cyan skyline silhouettes beyond playable bounds for futuristic city depth without heavy geometry.
```

### F6 — Import real meshes
```
Import Kenney CC0 buildings; place three facades and parasols on Arrival Plaza; rename VybeArt_*; simple colliders; no random pile.
```

**Import path if Gen AI cannot import:**  
`C:\Users\djtwi\VybeUniverse\horizon-assets\source\kenney\city-kit-commercial\`

### F7 — Night mood (optional)
```
Wire DayNightCycle to one DynamicLight and NightLight lamps; bright soft day; warm amber night; slow transitions.
```

---

## 15-word one-shot

```
Rebuild Arrival Plaza as bright futuristic waterfront with seating canopy landmark lighting.
```

---

## Pass criteria

From spawn you must see:
- Continuous futuristic floor  
- Landmark + canopy composition  
- Seating that invites hanging out  
- Soft cyan/gold accents  
- Clear path to Hub  
- No junk cubes or unfinished districts in view  

Then Preview. If still ugly, re-run F1–F3 only — do not expand more districts.
