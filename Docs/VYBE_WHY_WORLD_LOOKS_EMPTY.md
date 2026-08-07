# WHY THE WORLD LOOKS EMPTY

**World:** Vybe Social `1192248460643536`

## Honest cause

| What you have | What you see |
|---------------|--------------|
| TypeScript gameplay scripts | Logic only — **no mesh, no texture** |
| Kenney `.obj` files in `VybeUniverse\horizon-assets\` | Files on your PC — **not in Horizon until you Import** |
| Editor construction scripts | Create entity containers, triggers, lights, text, and wiring; their bare Trimesh entities have **no assigned mesh asset** |

Horizon does **not** show Unity assets. Scene meshes live inside the Desktop Editor world snapshot. Cursor cannot click Import or Run for you.

## What was wrong on disk (fixed 2026-07-21)

1. `VybeArrivalPlazaGraybox` + `VybeWorldShellZones` were sitting under **Scripts** (runtime) — they import `horizon/editor` and **cannot build the world from there**.
2. **Editor Scripts** folder was empty — nothing to Run.
3. Kenney OBJs were never imported into the world Asset Library.

## Corrected technical finding

The installed `horizon_editor.d.ts` provides `spawnEntityByType(Trimesh)` and tint/texture controls,
but no `setMesh` method. The existing builders never call `spawnAsset`, so they cannot guarantee
visible floors or buildings. A green run can therefore leave empty Trimesh placeholders.

## What creates a visible environment

1. Meta Gen AI **Code and act** creates visible built-in shapes in the scene.
2. **Import** Kenney OBJs (or Gen AI meshes) and place actual Asset Library objects.
3. Add imported asset IDs to an editor script and use `Editor.spawnAsset(...)`.
4. Use `meta-ai-prompts/22-nextgen-city-15-word-queue.md`, one validated district at a time.

Do not rely on the old graybox/shell Trimesh builders as proof of visible geometry.
