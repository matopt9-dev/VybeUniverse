# RUNTIME vs EDITOR — Why nothing works if you put the wrong code in Scripts

**World:** `1192248460643536`

## Two different Meta panels

| Panel | Folder on disk | Imports | Purpose |
|-------|----------------|---------|---------|
| **Scripts** (runtime) | `scripts/*.ts` | `horizon/core` only | Gameplay Components that run in Preview/play |
| **Editor Scripts** | `editor_scripts/*.ts` | `horizon/editor` | One-shot builders that place entities + wire props |

## What MUST be in Meta runtime (Scripts panel)

These are already Components with `Component.register(...)`:

- `VybeSpawnRecovery`
- `VybePlayerLifecycle`
- `VybeBootstrapSmoke`
- `VybeWorldDirectory`
- `VybeSocialCheckIn`
- `VybePortalPad`
- `VybePulseChallenge`
- `VybeAudioEnvironment`
- `VybeSocialDistrict`
- Plus Meta-added: CelebrationButton, JumpPad, ScavengerHunt, DayNightCycle, etc.

If these are missing from the **Scripts** panel, Preview has no game.

## What must NOT be in Scripts (runtime)

- `VybeBuildEverything`
- `VybeArrivalPlazaGraybox`
- `VybeWorldShellZones`
- `VybeSocialDistrictWire`

They import `horizon/editor`. Putting them in Scripts → **compile fails** → **nothing works**.

## Correct flow (2 minutes)

1. Open **Scripts** panel → confirm all `Vybe*` gameplay scripts are listed and compile with **zero errors**.
2. Open **Editor Scripts** → select `VybeBuildEverything` → **Run** (this attaches runtime scripts to entities and wires props).
3. Meta Gen AI Code and act (10 words):

```
Run Editor Script VybeBuildEverything then create visible plaza and hub
```

4. Save → Preview.

## If you only put builders in runtime

Compile breaks. Entities never get Components attached. World looks empty / broken.

## If you only have scripts but never Run the builder

Scripts exist but sit unwired → triggers/spawn/pulse do nothing.

**Both layers are required:** runtime Components **in Scripts**, builder **in Editor Scripts** then **Run**.
