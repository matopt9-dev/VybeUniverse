# ONE PASTE — Build VISIBLE world (environment + materials)

**Mode:** Code and act · Include world scripts: ON  
**Goal:** Player sees floors, walls, landmarks, color, lights — not an empty void.

```
You are building the VISIBLE environment for Vybe Social world 1192248460643536.

IGNORE gameplay script rewrites. Do NOT touch working Vybe* runtime Components unless wiring props.

PART 1 — Inspect existing placeholders
1) Do not assume VybeArrivalPlazaGraybox or VybeWorldShellZones created visible meshes.
2) Inspect VybePlazaFloor and other Trimesh entities for an assigned mesh asset.
3) Replace meshless Trimesh placeholders with visible built-in shapes or imported Asset Library objects.
4) Preserve triggers, spawn points, script hosts, lights, and working property wiring.

PART 2 — If plaza still empty, CREATE by hand with supported editor objects
Create under parent group 01_ARRIVAL_PLAZA:
- VybePlazaFloor: large ground Trimesh/shape ~40x40 at Y≈0, collidable, light gray or dark floor tint
- VybeWelcomeLandmark: tall accent mesh at (0,3,-8), warm orange/cyan tint
- Arrival walls/columns around plaza edges with openings for paths
- Seating benches (Trimesh) near spawn
- Static lights above plaza
- Text: VybeWelcomeSign "VYBE"
- SpawnPoint VybeSpawnPoint at (0, 0.15, 5) above the floor
- Triggers already named VybeDirectoryTrigger, VybeCheckInTrigger, VybePulse*, VybePortalPadTrigger — create if missing

Create under 02_SOCIAL_PULSE_HUB at center (0,0,55):
- Hub_Floor large walkable surface
- Hub_CentralLandmark colored landmark
- Hub_TitleSign text "SOCIAL HUB"
- Conversation pads
- Path from plaza (0,0,0) toward hub along +Z (Path_P1)

Apply consistent bright premium futuristic materials: neutral floors, cyan/teal accents, readable signs. No floating unlabeled Cube/Object names — rename everything.

PART 3 — Visibility check
- Camera/focus near (0,2,5). Floor must be visible.
- Objects must have collision where walkable.
- Save the world.

PART 4 — Report
List every mesh/floor/light/text created with exact names and positions. Compile scripts. Stop.
Do NOT claim textured Kenney imports unless you actually imported OBJ/GLB files — say IMPORT STILL REQUIRED for textured buildings.
```

## After this (textured 3D)

Manual Import in Desktop Editor (Cursor cannot do this):

1. Asset / Import → choose files from:
   `C:\Users\djtwi\VybeUniverse\horizon-assets\source\kenney\city-kit-commercial\`
2. Import: `low-detail-building-a.obj`, `low-detail-building-wide-a.obj`, `detail-parasol-a.obj`, `detail-awning.obj`, `detail-overhang.obj`
3. Also: `city-kit-industrial\chimney-small.obj`
4. Place near VybeWelcomeLandmark / check-in / portal / pulse pads
5. Or use Meta Gen AI **Generate Mesh** if available in your editor region

See `meta-ai-prompts/06-kenney-art-import.md`.
