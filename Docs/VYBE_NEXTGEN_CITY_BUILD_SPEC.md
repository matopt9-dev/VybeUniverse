# Vybe Social — Next-Generation City Build Specification

**World:** `1192248460643536`  
**Execution:** Meta Horizon Desktop Editor, Gen AI **Code and act**  
**Constraint:** Build one validated district per job; never generate the entire city at once.

## Critical finding

`Editor.spawnEntityByType(EditorEntityType.Trimesh, ...)` creates a Trimesh entity but the installed
`horizon/editor` API exposes no `setMesh` method. The existing graybox scripts assign scale and tint,
but no mesh asset. Those entities may therefore remain invisible. Visible construction must use:

1. Built-in visible shapes placed through Meta Code and Act.
2. Imported OBJ/FBX/GLB assets placed from the Asset Library.
3. `Editor.spawnAsset(...)` only after the imported asset ID is known.

Do not use runtime scripts to construct architecture.

## Horizon-native interpretation

The requested photoreal mega-city is not viable as literal full-density geometry on Quest. Use:

| Requested effect | Shippable Horizon implementation |
|------------------|----------------------------------|
| Massive open city | Ten connected playable districts plus low-cost skyline shells |
| Cinematic global illumination | Baked/authored lighting hierarchy and limited dynamic key lights |
| Volumetric fog | Sky/atmosphere treatment or sparse supported particles; never dense full-world particles |
| Realistic reflections | Material highlights and selective reflection-ready assets where supported |
| Dynamic weather | Three controlled atmosphere states: clear day, sunset, night |
| Dense NPC crowds | Small capped NavMesh-agent population in active districts only |
| Continuous traffic | Short looping decorative routes; non-collidable and distance-limited |
| Boats/drones/birds | Small pooled ambient sets; no unbounded spawning |
| Crystal water | Optimized water plane/material; no expensive simulated ocean |
| PBR city | Imported PBR-ready assets with LOD0/LOD1/LOD2 |

## District identity

| Zone | Visual identity | Required hero feature |
|------|-----------------|-----------------------|
| Arrival Plaza | Miami waterfront futurism | Welcome monolith and fountain |
| Social Pulse Hub | Singapore garden city | Social canopy and conversation rings |
| Creator District | Tokyo media street | Showcase pods and creator stage |
| Live Venue | Dubai event architecture | Main stage and audience terraces |
| Game Lounge | Neon entertainment quarter | Arcade pavilion and activity pads |
| Discovery Boulevard | Luxury retail promenade | Shopfront facades and quest landmarks |
| Expression Studio | Fashion/content loft | Pose stage and mirrors |
| Calm Space | Tropical garden retreat | Waterfall garden and quiet seating |
| Safety Center | Bright civic pavilion | Rules board and recovery point |
| Portal Concourse | Marina transit terminal | Real portal arches and destination board |

## Environment layers

1. **Playable layer:** floors, railings, paths, entrances, recovery.
2. **Architecture layer:** low/medium-detail buildings with valid entrances.
3. **Skyline layer:** simplified non-collidable silhouettes outside playable bounds.
4. **Nature layer:** palms, planters, beach, water, mountains.
5. **Life layer:** capped agents, drones, birds, boats, fountains.
6. **Atmosphere layer:** day/sunset/night states, audio, selective particles.

## Asset workflow

- Import staged Kenney CC0 assets from `horizon-assets/source/kenney/`.
- Add curated CC0 models only when license evidence exists.
- Generate custom hero meshes one at a time through Meta Gen AI.
- Create LOD variants for repeated or distant architecture.
- Use simple box/sphere colliders instead of detailed mesh collision.

## Performance gates after each district

1. Wireframe view: reject unnecessary polygon density.
2. Collision view: reject complex/invisible collision.
3. Overdraw view: reduce transparent overlap and dense effects.
4. Preview at player height: verify routes, scale, and readability.
5. Multiplayer Preview: verify active agents and interactions.
6. Stop construction if frame stability degrades.

## Completion rule

No district is complete until it has continuous flooring, a landmark, a readable entrance, safe
navigation, lighting, ambience, one functional reason to visit, and a recorded Preview pass.
