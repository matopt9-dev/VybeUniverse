# horizon-scripts

Horizon TypeScript for **Vybe Social Horizon Edition**, world **`1192248460643536`**.

See `Docs/HORIZON_ARCHITECTURE.md`, `Docs/HORIZON_SYSTEMS_SETUP.md`, `Docs/HORIZON_WORLD_BINDING.md`.

---

## Systems (Phases 2–8)

| Path | Role |
|------|------|
| `systems/VybeBootstrapSmoke.ts` | Join smoke |
| `systems/VybeSpawnRecovery.ts` | Join teleport + recovery |
| `systems/VybePlayerLifecycle.ts` | Join/leave NetworkEvent |
| `systems/VybeWorldDirectory.ts` | Directory popup / TextGizmo / landmark flash |
| `systems/VybePortalPad.ts` | Same-world portal |
| `systems/VybeSocialCheckIn.ts` | Real-player check-in |
| `systems/VybePulseChallenge.ts` | Coop pulse (authority harden) |
| `systems/VybeAudioEnvironment.ts` | AudioGizmo ambience + zone |
| `systems/VybeSocialDistrict.ts` | Social District hub |
| `systems/VybeDebug.ts` | Log helper — **do not attach** |

Runtime imports: **`horizon/core` only**.

Editor helper (not runtime): `editor/VybeArrivalPlazaGraybox.ts` — run in Desktop Editor Scripts to place Arrival Plaza graybox + wire systems. See `Docs/NEXT_ACTIONS.md`.

---

## Setup

1. Sync: copy `systems/*.ts` → world `scripts/` (done for Phases 6–8).
2. Follow `Docs/HORIZON_SYSTEMS_SETUP.md` + `Docs/PHASE_8_SOCIAL_DISTRICT.md`.
3. Meta AI: prompts `04`–`10` under `meta-ai-prompts/`.
4. Test: Phase 7 matrix + `Docs/HORIZON_SYSTEMS_TEST.md`.

---

## Local compile

```powershell
$node = "$env:LOCALAPPDATA\Programs\cursor\resources\app\resources\helpers\node.exe"
Set-Location C:\Users\djtwi\VybeUniverse\horizon-scripts
& $node .\node_modules\typescript\lib\tsc.js -p .\tsconfig.smoke.json --outDir .\_compile-out --rootDir .
```

Evidence: `test-reports/phase6-8-compile-2026-07-17.md`.
