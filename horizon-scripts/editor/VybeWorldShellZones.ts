/**
 * Vybe Social VR — World shell: hierarchy, pathways, zone floors + landmarks.
 * World ID: 1192248460643536
 *
 * RUN AFTER VybeArrivalPlazaGraybox (Editor Scripts). Idempotent by exact name.
 * Proven APIs only from this world's horizon_editor.d.ts.
 *
 * Creates named Trimesh placeholders for zones 02–10 plus signs and recovery spawns.
 * IMPORTANT: placeholders have no mesh asset until replaced by Code and Act shapes
 * or imported assets. Do not treat a successful run as visible geometry evidence.
 *
 * Does NOT: invent APIs, fake social feeds, attach unfinished mini-games,
 * spawnAsset mystery IDs, Persistent Variables, Kenney import.
 */
import {
  Editor,
  EditorEntityType,
  MotionType,
  EditableEntity,
  TextEntity,
  TrimeshEntity,
  StaticLightEntity,
} from 'horizon/editor';
import { Vec3, Quaternion } from 'horizon/core';

const Q = Quaternion.one;

const C = {
  floor: '#2f3440',
  path: '#3a4150',
  wall: '#c8d0dc',
  landmark: '#f0a030',
  hub: '#3ec8e0',
  creator: '#e8a0c8',
  venue: '#ff6b4a',
  games: '#6bdc8a',
  discovery: '#7ab8ff',
  expression: '#d4a0ff',
  calm: '#a8c4b8',
  safety: '#e8eef5',
  portals: '#ffe08a',
};

async function ensureNamed<T extends EditableEntity>(
  name: string,
  create: () => Promise<T>
): Promise<T> {
  const existing = Editor.findByName(name);
  if (existing.length > 0) {
    return existing[0] as T;
  }
  const entity = await create();
  await entity.setName(name);
  return entity;
}

async function ensureGroup(name: string, position: Vec3): Promise<EditableEntity> {
  return ensureNamed(name, async () => {
    const g = await Editor.spawnEntityByType(EditorEntityType.EntityGroup, position, Q);
    await g.setPosition(position);
    await g.setRotation(Q);
    return g;
  });
}

async function ensureEmpty(name: string, position: Vec3): Promise<EditableEntity> {
  return ensureNamed(name, async () => {
    const e = await Editor.spawnEmptyEntity(position, Q);
    await e.setPosition(position);
    await e.setRotation(Q);
    return e;
  });
}

async function ensureSpawn(name: string, position: Vec3) {
  const entity = await ensureNamed(name, async () => Editor.spawnSpawnPoint(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
  return entity;
}

async function ensureText(
  name: string,
  position: Vec3,
  text: string,
  scale: Vec3
): Promise<TextEntity> {
  const entity = await ensureNamed(name, async () => Editor.spawnText(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
  await entity.setLocalScale(scale);
  await entity.setText(text);
  return entity;
}

async function ensureTrimesh(
  name: string,
  position: Vec3,
  scale: Vec3,
  tint: string
): Promise<TrimeshEntity> {
  const entity = await ensureNamed(name, async () =>
    Editor.spawnEntityByType(EditorEntityType.Trimesh, position, Q)
  );
  await entity.setPosition(position);
  await entity.setRotation(Q);
  await entity.setLocalScale(scale);
  await entity.setMotionType(MotionType.Animated);
  try {
    await entity.setTintColor(tint);
  } catch (_e) {
    try {
      await entity.setColor(tint);
    } catch (_e2) {
      // optional
    }
  }
  try {
    await entity.setCollidable(true);
  } catch (_e) {
    // optional
  }
  return entity;
}

async function ensureLight(
  name: string,
  position: Vec3,
  intensity: number,
  color: string
): Promise<StaticLightEntity> {
  const entity = await ensureNamed(name, async () => Editor.spawnStaticLight(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
  try {
    await entity.setIntensity(intensity);
    await entity.setColor(color);
    await entity.setEnabled(true);
  } catch (_e) {
    // optional
  }
  return entity;
}

async function parentUnder(child: EditableEntity, parent: EditableEntity): Promise<void> {
  try {
    await child.setParent(parent);
  } catch (_e) {
    console.warn(`[VybeShell] setParent failed for ${child.name}`);
  }
}

type ZoneDef = {
  folder: string;
  center: Vec3;
  floorName: string;
  floorScale: Vec3;
  landmarkName: string;
  landmarkPos: Vec3;
  landmarkScale: Vec3;
  landmarkTint: string;
  signName: string;
  signText: string;
  spawnName: string;
  spawnPos: Vec3;
  lightName: string;
};

async function buildZone(worldRoot: EditableEntity, z: ZoneDef): Promise<void> {
  const folder = await ensureGroup(z.folder, z.center);
  await parentUnder(folder, worldRoot);

  const floors = await ensureGroup(`${z.folder}_FLOORS`, z.center);
  const arch = await ensureGroup(`${z.folder}_ARCHITECTURE`, z.center);
  const signs = await ensureGroup(`${z.folder}_SIGNAGE`, z.center);
  const lights = await ensureGroup(`${z.folder}_LIGHTING`, z.center);
  const spawns = await ensureGroup(`${z.folder}_SPAWNS`, z.center);
  await parentUnder(floors, folder);
  await parentUnder(arch, folder);
  await parentUnder(signs, folder);
  await parentUnder(lights, folder);
  await parentUnder(spawns, folder);

  const floor = await ensureTrimesh(
    z.floorName,
    new Vec3(z.center.x, -0.05, z.center.z),
    z.floorScale,
    C.floor
  );
  await parentUnder(floor, floors);

  const landmark = await ensureTrimesh(
    z.landmarkName,
    z.landmarkPos,
    z.landmarkScale,
    z.landmarkTint
  );
  await parentUnder(landmark, arch);

  // Simple facade walls (open center) — four corner pillars for silhouette
  const hw = z.floorScale.x * 0.4;
  const hd = z.floorScale.z * 0.4;
  const pillars: Array<{ name: string; p: Vec3 }> = [
    {
      name: `${z.folder}_Pillar_NE`,
      p: new Vec3(z.center.x + hw, 2.5, z.center.z + hd),
    },
    {
      name: `${z.folder}_Pillar_NW`,
      p: new Vec3(z.center.x - hw, 2.5, z.center.z + hd),
    },
    {
      name: `${z.folder}_Pillar_SE`,
      p: new Vec3(z.center.x + hw, 2.5, z.center.z - hd),
    },
    {
      name: `${z.folder}_Pillar_SW`,
      p: new Vec3(z.center.x - hw, 2.5, z.center.z - hd),
    },
  ];
  for (let i = 0; i < pillars.length; i++) {
    const p = pillars[i];
    const pillar = await ensureTrimesh(p.name, p.p, new Vec3(1.4, 5, 1.4), C.wall);
    await parentUnder(pillar, arch);
  }

  const sign = await ensureText(
    z.signName,
    new Vec3(z.landmarkPos.x, z.landmarkPos.y + z.landmarkScale.y * 0.55, z.landmarkPos.z + 1),
    z.signText,
    new Vec3(2, 2, 2)
  );
  await parentUnder(sign, signs);

  const spawn = await ensureSpawn(z.spawnName, z.spawnPos);
  await parentUnder(spawn, spawns);

  const light = await ensureLight(
    z.lightName,
    new Vec3(z.center.x, 14, z.center.z),
    0.9,
    '#fff8f0'
  );
  await parentUnder(light, lights);
}

async function buildPath(
  pathsRoot: EditableEntity,
  name: string,
  position: Vec3,
  scale: Vec3
): Promise<void> {
  const path = await ensureTrimesh(name, position, scale, C.path);
  await parentUnder(path, pathsRoot);
}

async function main() {
  Editor.beginUndoStack();
  console.log('[VybeShell] World shell start — zones + pathways');

  const worldRoot = await ensureGroup('VYBE_WORLD_ROOT', new Vec3(0, 0, 0));
  const systems = await ensureGroup('00_SYSTEMS', new Vec3(0, 0, 0));
  const pathways = await ensureGroup('11_PATHWAYS', new Vec3(0, 0, 0));
  const globalLight = await ensureGroup('12_GLOBAL_LIGHTING', new Vec3(0, 0, 0));
  const nav = await ensureGroup('15_NAVIGATION_AND_SPAWNS', new Vec3(0, 0, 0));
  const quarantine = await ensureGroup('_VYBE_LEGACY_QUARANTINE', new Vec3(0, -50, 0));
  await parentUnder(systems, worldRoot);
  await parentUnder(pathways, worldRoot);
  await parentUnder(globalLight, worldRoot);
  await parentUnder(nav, worldRoot);
  await parentUnder(quarantine, worldRoot);
  try {
    await quarantine.setVisible(false);
  } catch (_e) {
    // ignore
  }

  // Re-parent Arrival plaza under world root if it exists
  const arrival = Editor.findByName('01_ARRIVAL_PLAZA');
  if (arrival.length > 0) {
    await parentUnder(arrival[0], worldRoot);
  }

  const zones: ZoneDef[] = [
    {
      folder: '02_SOCIAL_PULSE_HUB',
      center: new Vec3(0, 0, 55),
      floorName: 'Hub_Floor',
      floorScale: new Vec3(60, 0.1, 55),
      landmarkName: 'Hub_CentralLandmark',
      landmarkPos: new Vec3(0, 4, 55),
      landmarkScale: new Vec3(4, 8, 4),
      landmarkTint: C.hub,
      signName: 'Hub_TitleSign',
      signText: 'SOCIAL PULSE HUB',
      spawnName: 'Hub_RecoverySpawn',
      spawnPos: new Vec3(0, 0.15, 45),
      lightName: 'Hub_KeyLight',
    },
    {
      folder: '03_CREATOR_DISTRICT',
      center: new Vec3(-70, 0, 55),
      floorName: 'Creator_Floor',
      floorScale: new Vec3(55, 0.1, 60),
      landmarkName: 'Creator_StageLandmark',
      landmarkPos: new Vec3(-70, 3.5, 55),
      landmarkScale: new Vec3(8, 1.2, 5),
      landmarkTint: C.creator,
      signName: 'Creator_TitleSign',
      signText: 'CREATOR DISTRICT',
      spawnName: 'Creator_RecoverySpawn',
      spawnPos: new Vec3(-70, 0.15, 40),
      lightName: 'Creator_KeyLight',
    },
    {
      folder: '04_VYBE_LIVE_VENUE',
      center: new Vec3(75, 0, 60),
      floorName: 'Venue_Floor',
      floorScale: new Vec3(70, 0.1, 75),
      landmarkName: 'Venue_MainStage',
      landmarkPos: new Vec3(75, 1.2, 75),
      landmarkScale: new Vec3(20, 1.5, 10),
      landmarkTint: C.venue,
      signName: 'Venue_TitleSign',
      signText: 'VYBE LIVE',
      spawnName: 'Venue_RecoverySpawn',
      spawnPos: new Vec3(75, 0.15, 35),
      lightName: 'Venue_KeyLight',
    },
    {
      folder: '05_GAME_LOUNGE',
      center: new Vec3(-70, 0, -45),
      floorName: 'Games_Floor',
      floorScale: new Vec3(65, 0.1, 60),
      landmarkName: 'Games_CentralLandmark',
      landmarkPos: new Vec3(-70, 3, -45),
      landmarkScale: new Vec3(5, 6, 5),
      landmarkTint: C.games,
      signName: 'Games_TitleSign',
      signText: 'GAME LOUNGE',
      spawnName: 'Games_RecoverySpawn',
      spawnPos: new Vec3(-70, 0.15, -30),
      lightName: 'Games_KeyLight',
    },
    {
      folder: '06_DISCOVERY_BOULEVARD',
      center: new Vec3(70, 0, -45),
      floorName: 'Discovery_Floor',
      floorScale: new Vec3(60, 0.1, 60),
      landmarkName: 'Discovery_Landmark',
      landmarkPos: new Vec3(70, 4, -45),
      landmarkScale: new Vec3(3, 8, 3),
      landmarkTint: C.discovery,
      signName: 'Discovery_TitleSign',
      signText: 'DISCOVERY',
      spawnName: 'Discovery_RecoverySpawn',
      spawnPos: new Vec3(70, 0.15, -30),
      lightName: 'Discovery_KeyLight',
    },
    {
      folder: '07_EXPRESSION_STUDIO',
      center: new Vec3(-125, 0, 30),
      floorName: 'Expression_Floor',
      floorScale: new Vec3(45, 0.1, 45),
      landmarkName: 'Expression_Landmark',
      landmarkPos: new Vec3(-125, 2.5, 30),
      landmarkScale: new Vec3(6, 5, 2),
      landmarkTint: C.expression,
      signName: 'Expression_TitleSign',
      signText: 'EXPRESSION',
      spawnName: 'Expression_RecoverySpawn',
      spawnPos: new Vec3(-125, 0.15, 30),
      lightName: 'Expression_KeyLight',
    },
    {
      folder: '08_CALM_SPACE',
      center: new Vec3(120, 0, 15),
      floorName: 'Calm_Floor',
      floorScale: new Vec3(40, 0.1, 45),
      landmarkName: 'Calm_Landmark',
      landmarkPos: new Vec3(120, 2, 15),
      landmarkScale: new Vec3(4, 4, 4),
      landmarkTint: C.calm,
      signName: 'Calm_TitleSign',
      signText: 'CALM SPACE',
      spawnName: 'Calm_RecoverySpawn',
      spawnPos: new Vec3(120, 0.15, 15),
      lightName: 'Calm_KeyLight',
    },
    {
      folder: '09_SAFETY_HELP_CENTER',
      center: new Vec3(0, 0, -65),
      floorName: 'Safety_Floor',
      floorScale: new Vec3(35, 0.1, 30),
      landmarkName: 'Safety_Landmark',
      landmarkPos: new Vec3(0, 2.5, -65),
      landmarkScale: new Vec3(3, 5, 1.5),
      landmarkTint: C.safety,
      signName: 'Safety_TitleSign',
      signText: 'SAFETY & HELP',
      spawnName: 'Safety_RecoverySpawn',
      spawnPos: new Vec3(0, 0.15, -60),
      lightName: 'Safety_KeyLight',
    },
    {
      folder: '10_EVENT_PORTAL_CONCOURSE',
      center: new Vec3(0, 0, 115),
      floorName: 'PortalConcourse_Floor',
      floorScale: new Vec3(65, 0.1, 35),
      landmarkName: 'PortalConcourse_Landmark',
      landmarkPos: new Vec3(0, 3, 115),
      landmarkScale: new Vec3(8, 6, 2),
      landmarkTint: C.portals,
      signName: 'PortalConcourse_TitleSign',
      signText: 'PORTALS',
      spawnName: 'PortalConcourse_RecoverySpawn',
      spawnPos: new Vec3(0, 0.15, 110),
      lightName: 'PortalConcourse_KeyLight',
    },
  ];

  for (let i = 0; i < zones.length; i++) {
    await buildZone(worldRoot, zones[i]);
  }

  // Pathways (continuous walkable strips)
  await buildPath(pathways, 'Path_P1_Arrival_to_Hub', new Vec3(0, -0.04, 28), new Vec3(6, 0.08, 20));
  await buildPath(pathways, 'Path_P1b_Hub_Approach', new Vec3(0, -0.04, 42), new Vec3(8, 0.08, 12));
  await buildPath(pathways, 'Path_P2_Arrival_to_Games', new Vec3(-28, -0.04, -18), new Vec3(28, 0.08, 5));
  await buildPath(pathways, 'Path_P2b_Games_Approach', new Vec3(-55, -0.04, -32), new Vec3(18, 0.08, 5));
  await buildPath(pathways, 'Path_P3_Arrival_to_Discovery', new Vec3(28, -0.04, -18), new Vec3(28, 0.08, 5));
  await buildPath(pathways, 'Path_P3b_Discovery_Approach', new Vec3(55, -0.04, -32), new Vec3(18, 0.08, 5));
  await buildPath(pathways, 'Path_P4_Hub_to_Creator', new Vec3(-35, -0.04, 55), new Vec3(30, 0.08, 6));
  await buildPath(pathways, 'Path_P5_Hub_to_Venue', new Vec3(38, -0.04, 58), new Vec3(30, 0.08, 6));
  await buildPath(pathways, 'Path_P6_Hub_to_Portals', new Vec3(0, -0.04, 88), new Vec3(6, 0.08, 30));
  await buildPath(pathways, 'Path_P7_Creator_to_Expression', new Vec3(-98, -0.04, 42), new Vec3(30, 0.08, 5));
  await buildPath(pathways, 'Path_P8_Venue_to_Calm', new Vec3(98, -0.04, 35), new Vec3(28, 0.08, 5));
  await buildPath(pathways, 'Path_P9_Arrival_to_Safety', new Vec3(0, -0.04, -42), new Vec3(5, 0.08, 18));

  // Hub conversation platforms (visible social clusters — no fake feeds)
  const hubClusterA = await ensureTrimesh(
    'Hub_ConversationPad_A',
    new Vec3(-12, 0.08, 50),
    new Vec3(8, 0.1, 8),
    C.hub
  );
  const hubClusterB = await ensureTrimesh(
    'Hub_ConversationPad_B',
    new Vec3(12, 0.08, 50),
    new Vec3(8, 0.1, 8),
    C.hub
  );
  const hubClusterC = await ensureTrimesh(
    'Hub_ConversationPad_C',
    new Vec3(0, 0.08, 62),
    new Vec3(10, 0.1, 8),
    C.hub
  );
  const hubFolder = Editor.findByName('02_SOCIAL_PULSE_HUB_FLOORS');
  if (hubFolder.length > 0) {
    await parentUnder(hubClusterA, hubFolder[0]);
    await parentUnder(hubClusterB, hubFolder[0]);
    await parentUnder(hubClusterC, hubFolder[0]);
  }

  // Safety help board text (native tools guidance — no fake moderation)
  const safetyBoard = await ensureText(
    'Safety_RulesBoard',
    new Vec3(0, 2.2, -62),
    'VYBE RULES\nBe kind. Use Meta mute/block/report.\nUnstuck: stand on SAFETY spawn.\nNo medical claims.',
    new Vec3(1.4, 1.4, 1.4)
  );
  const safetySigns = Editor.findByName('09_SAFETY_HELP_CENTER_SIGNAGE');
  if (safetySigns.length > 0) {
    await parentUnder(safetyBoard, safetySigns[0]);
  }

  // Global rim light
  const rim = await ensureLight('Global_RimLight', new Vec3(0, 40, 40), 0.4, '#d0e8ff');
  await parentUnder(rim, globalLight);

  // Marker under systems for shell completion
  const marker = await ensureEmpty('VybeWorldShell_Marker', new Vec3(0, 2, 0));
  await parentUnder(marker, systems);

  // Rename world if still generic (best-effort)
  try {
    if (Editor.world && typeof Editor.world.setName === 'function') {
      const current = Editor.world.name;
      if (current == null || current === '' || current.toLowerCase().indexOf('new world') >= 0) {
        await Editor.world.setName('Vybe Social VR');
      }
    }
  } catch (_e) {
    console.log('[VybeShell] World rename skipped — set display name manually.');
  }

  Editor.endUndoStack();
  console.log('[VybeShell] Zones 02–10 + pathways complete. Preview walk Hub / Safety / Games.');
  console.log('[VybeShell] Next: Meta AI polish jobs per zone; import Kenney; wire Social District.');
}

main();
