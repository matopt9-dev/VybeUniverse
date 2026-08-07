# HORIZON COMPATIBILITY MATRIX — Phase 1

**Reconstruction:** NOT STARTED · **Unity modified:** NO  
**HARD RULE:** Do not invent Horizon module support. Anything beyond proven `horizon/core` for a **Vybe** world is **UNKNOWN** until that world exists and generates typings.

---

## Horizon toolchain facts (local)

| Fact | Value |
|------|-------|
| Worlds Desktop Editor | `C:\Program Files\Worlds Desktop Editor\v1` |
| App version | 275.0.0.6.265 |
| Core API | 2.0.0 |
| TypeScript | 4.7.4 |
| Local workspaces | 22 |
| Proven non-Vybe world | Primal Waters `1184324168102632` |
| **Vybe Social Horizon Edition world ID** | **MISSING — HARD BLOCKER** |
| Vybe generated typings | **MISSING** |

VybeUniverse is a **Unity** project, not a Horizon project.

---

## Classification A–F (Unity → Horizon)

| Class | Definition | Unity examples | Horizon action |
|-------|------------|----------------|----------------|
| **A** | Concept / rules portable as design | Portal graph intent, Path A/B product labels, local game rule design | Redesign in Horizon TS after world exists |
| **B** | Network/API client patterns | Feed/friends/messages clients | Rebuild clients; do not copy C# |
| **C** | Heavy engine-specific runtime | `VybeWorldFactory`, XR locomotion, URP lighting | Full redesign; main risk |
| **D** | Editor / pipeline only | `Assets/Editor/VybeVRWorldBuilder.cs`, validators | Do not port; replace with Horizon Desktop + new tools |
| **E** | Broken / disconnected / blocked | Search/invitation/identity UI; prod `/api/v1` SPA | Fix backend or cut; do not fake in Horizon |
| **F** | Incompatible / absent | Unity Netcode world sync (absent), Plugins (absent), C# IL | Out of scope |

### Risk concentration

- **C/D:** Giant world/XR builders — highest Horizon redesign risk.
- **E:** Social Phase-3 routes — honesty: blocked on prod.
- **UNKNOWN:** Modules beyond `horizon/core` for Vybe world.

---

## Unity system → Horizon map

| Unity system | Class | Horizon mapping |
|--------------|-------|-----------------|
| Sparse scenes + portals | A | Rebuild as Horizon places / teleport / UI nav — exact API UNKNOWN until typings |
| Procedural city factory | C | Rebuild content in Desktop Editor; no C# factory port |
| XRI / OpenXR locomotion | C/F | Horizon input/locomotion model differs — redesign |
| Path A offline | A | Product mode; storage APIs UNKNOWN until typings |
| Path B REST/realtime to vybesocial.net | B | Possible via Horizon networking constraints — **UNKNOWN** limits until world + policy review |
| Invitations/achievements/identity `/api/v1` | E | Blocked on prod; Horizon cannot invent routes |
| Kenney OBJ | A (art) | Candidate re-import; format support validate post-world |
| Landmark null shells | F/C | Rebuild meshes |
| Addressables | F (absent) | N/A |
| Netcode replication | F (absent) | Horizon multiplayer ≠ Unity NGO; design from scratch |
| AssetBundles | UNKNOWN | Path exists conceptually; source format limits partly UNKNOWN |
| Editor builders | D | Cursor/GitHub docs only; Meta AI prompts later — no scripts yet |

---

## Compatibility verdict

| Question | Answer |
|----------|--------|
| Can we start Horizon gameplay scripts now? | **NO** |
| Why? | No Vybe world ID / generated typings |
| Can we copy Unity C#? | **NO** |
| Is reconstruction started? | **NO** |
