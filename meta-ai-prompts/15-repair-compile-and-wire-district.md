# Meta Gen AI — Repair compile + wire Social District

Full sequence: `Docs/VYBE_META_GEN_AI_PROMPTS.md`

## Do this first (PROMPT 1)

Paste into Code and act (include world scripts):

```
Inspect Scripts panel and Editor Scripts panel for VybeArrivalPlazaGraybox and VybeWorldShellZones.

If either file appears under runtime Scripts (world scripts), REMOVE it from Scripts only. Those files import horizon/editor and must exist ONLY under Editor Scripts.

Do not delete the Editor Scripts copies.
Do not modify working gameplay scripts unless required to compile.

Detach VybeArrivalPlazaGraybox or VybeWorldShellZones from any entity if attached as components.

Recompile. Report exact remaining TypeScript errors. Stop.
```

## Then (preferred over Prompt 4 recreation)

**Editor Scripts → Run `VybeSocialDistrictWire` once.**

## Then PROMPT 6 verify connections

See `Docs/VYBE_META_GEN_AI_PROMPTS.md`.
