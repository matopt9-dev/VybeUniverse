# Vybe Platform Support Gate

**Audit:** 2026-07-19  
**Sources:** Installed world typings + public Meta Horizon creator documentation (web).  
**Not verified live:** Exact Desktop Editor build number on this machine (not readable from Cursor).

## Installed in THIS world

| Fact | Value |
|------|-------|
| Horizon TS API constant | `ApiVersion = "2.0.0"` in `scripts/types/horizon_core.d.ts` |
| Runtime TS pin | `typescript@4.7.4` (`scripts/package.json`) |
| Editor TS pin | `typescript@4.7.4` (`editor_scripts/package.json`) |
| Core module | `horizon/core` — Components, gizmos, networking, persistence, popups |
| Editor module | `horizon/editor` — spawn/find/wire (editor scripts only) |
| Additional type packages present | `horizon/ui`, `horizon/camera`, `horizon/navmesh`, `horizon/performance`, `horizon/analytics`, `horizon/unity_asset_bundles`, i18n/UI utils, CreateClasses |

## Publishing / play surfaces (documentation-level)

Official creator materials describe Desktop Editor creation with Preview for:

- VR headset sessions (Quest / Horizon VR clients where available)
- Mobile / web-compatible worlds (platform toggles in publishing settings)

**Cursor cannot read this world’s publishing checklist toggles.** Owner must confirm in Desktop Editor → Publishing:

- Target platforms enabled for this world  
- Capacity / instance settings  
- Mobile/web compatibility flags  

Do **not** assume Unity Quest APK (`VybeUniverse.apk` in repo) equals Horizon publish.

## Gen AI modes

Meta Desktop Editor Gen AI (TypeScript assist, asset generation where region-enabled, Code and Act where available) runs **inside the owner’s Desktop Editor**.

| Capability | Cursor access |
|------------|---------------|
| Issue prompt text | Yes — this repo’s queue |
| Click Code and Act | **No** |
| See Gen AI apply result | Only if owner pastes report / exports |

## Supported patterns for Vybe (proven by typings + existing scripts)

- `Component` + `propsDefinition` + `Component.register`
- `CodeBlockEvents` on `this.entity` or Trigger entities
- `SpawnPointGizmo.teleportPlayer`
- `NetworkEvent` broadcast
- `persistentStorage` player variables (**after Systems registration**)
- `world.ui.showPopupForPlayer`
- `TextGizmo`, `AudioGizmo`, `ParticleGizmo`
- Ownership `transferOwnership` / `receiveOwnership` (Pulse)

## Unsupported / do not invent

| Pattern | Why |
|---------|-----|
| `fetch`, DOM, Node, npm runtime packages | Not Horizon runtime |
| Firebase / Supabase / custom WebSocket social backend | Not installed; would be fake if buttoned |
| Unity C# / XRI / Photon from this repo | Different product |
| Editor API to create Persistent Variables | Not in `horizon_editor.d.ts` |
| Claiming romantic matchmaking / PII profiles | Policy + privacy |

## Performance / complexity

`horizon/performance` typings exist. No live complexity meter reading from Cursor. Budget work is **owner Preview + multiplayer** after geometry exists.

## Honest platform conclusion

This project **can** be a Horizon Worlds social destination using current TS APIs. It **cannot** honestly claim Unity VR feature parity (feeds, shops, custom accounts). Build Horizon-native social loops; hide anything that would be a fake button.
