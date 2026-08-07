/**
 * VybeBuildEverything — MASTER Editor Script (horizon/editor ONLY).
 * World: 1192248460643536
 *
 * RUN FROM: Desktop Editor → Editor Scripts → Run VybeBuildEverything
 * OR trigger via Meta Gen AI 10-word prompt (see meta-ai-prompts/26-TEN-WORD-BUILD-EVERYTHING.md)
 *
 * What this script DOES (proven APIs):
 * - Hierarchy, groups, quarantine root
 * - Triggers, SpawnPoints, Text, StaticLights, Seats, AmbientAudio
 * - Attach/wire ALL Vybe gameplay Components
 * - Social District entities + wiring
 * - Zone folder shells + pathway markers + recovery spawns
 * - Trimesh PLACEHOLDERS (tint/scale only — may be INVISIBLE until Code and Act replaces with real shapes)
 *
 * What this script CANNOT guarantee alone:
 * - Visible textured architecture (Trimesh spawn has no setMesh in this API)
 * - Kenney OBJ import (owner Import UI / Gen AI import)
 *
 * Meta Gen AI Code and Act MUST accompany this run to create VISIBLE floors/buildings.
 */
import {
  Editor,
  EditorEntityType,
  MotionType,
  EditableEntity,
  TriggerEntity,
  TextEntity,
  TrimeshEntity,
  StaticLightEntity,
} from 'horizon/editor';
import { Vec3, Quaternion } from 'horizon/core';

const Q = Quaternion.one;

const C = {
  floor: '#E8E2D6',
  path: '#C9D4DC',
  wall: '#F4F7FA',
  column: '#E8EEF4',
  accent: '#E8A838',
  cyan: '#2EC4D6',
  seat: '#D8DEE8',
  pulse: '#333840',
  portal: '#1a3038',
  hub: '#2EC4D6',
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

async function ensureTrigger(name: string, position: Vec3, scale: Vec3): Promise<TriggerEntity> {
  const entity = await ensureNamed(name, async () => Editor.spawnTrigger(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
  await entity.setLocalScale(scale);
  return entity;
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
  tint: string,
  collidable: boolean = true
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
    await entity.setCollidable(collidable);
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

async function ensureSeat(name: string, position: Vec3): Promise<EditableEntity> {
  const entity = await ensureNamed(name, async () => Editor.spawnSeat(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
  return entity;
}

async function parentUnder(child: EditableEntity, parent: EditableEntity): Promise<void> {
  try {
    await child.setParent(parent);
  } catch (_e) {
    console.warn(`[VybeBuild] setParent failed for ${child}`);
  }
}

async function attachScript(entity: EditableEntity, scriptName: string): Promise<boolean> {
  const script = Editor.getScriptByName(scriptName);
  if (script == null) {
    console.warn(`[VybeBuild] Script not found (skip): ${scriptName}`);
    return false;
  }
  await entity.setScript(script);
  return true;
}

async function hideIfExists(name: string): Promise<void> {
  const found = Editor.findByName(name);
  for (let i = 0; i < found.length; i++) {
    try {
      await found[i].setVisible(false);
    } catch (_e) {
      // ignore
    }
  }
}

async function buildPlazaAndWire(): Promise<void> {
  const root = await ensureGroup('01_ARRIVAL_PLAZA', new Vec3(0, 0, 0));
  const grpArch = await ensureGroup('Arrival_ARCHITECTURE', new Vec3(0, 0, 0));
  const grpFloor = await ensureGroup('Arrival_FLOORS', new Vec3(0, 0, 0));
  const grpFurn = await ensureGroup('Arrival_FURNITURE', new Vec3(0, 0, 0));
  const grpSign = await ensureGroup('Arrival_SIGNAGE', new Vec3(0, 0, 0));
  const grpLight = await ensureGroup('Arrival_LIGHTING', new Vec3(0, 0, 0));
  const grpIx = await ensureGroup('Arrival_INTERACTIONS', new Vec3(0, 0, 0));
  const grpSys = await ensureGroup('Arrival_SYSTEMS', new Vec3(0, 0, 0));
  await parentUnder(grpArch, root);
  await parentUnder(grpFloor, root);
  await parentUnder(grpFurn, root);
  await parentUnder(grpSign, root);
  await parentUnder(grpLight, root);
  await parentUnder(grpIx, root);
  await parentUnder(grpSys, root);

  const floor = await ensureTrimesh('VybePlazaFloor', new Vec3(0, -0.05, 0), new Vec3(40, 0.1, 40), C.floor);
  await parentUnder(floor, grpFloor);
  const welcomeRing = await ensureTrimesh('Arrival_WelcomeRing', new Vec3(0, 0.02, 5), new Vec3(10, 0.06, 10), C.path);
  await parentUnder(welcomeRing, grpFloor);
  await parentUnder(await ensureTrimesh('Arrival_PathStub_ToHub', new Vec3(0, -0.04, 24), new Vec3(6, 0.08, 12), C.path), grpFloor);

  const landmark = await ensureTrimesh('VybeWelcomeLandmark', new Vec3(0, 3, -8), new Vec3(3, 6, 1.4), C.accent);
  await parentUnder(landmark, grpArch);
  await parentUnder(await ensureTrimesh('Arrival_Canopy', new Vec3(0, 6.5, -6), new Vec3(14, 0.25, 8), C.cyan, false), grpArch);

  const pylons = [
    { n: 'Arrival_Pylon_NE', p: new Vec3(14, 2.5, 14) },
    { n: 'Arrival_Pylon_NW', p: new Vec3(-14, 2.5, 14) },
    { n: 'Arrival_Pylon_SE', p: new Vec3(14, 2.5, -14) },
    { n: 'Arrival_Pylon_SW', p: new Vec3(-14, 2.5, -14) },
  ];
  for (let i = 0; i < pylons.length; i++) {
    await parentUnder(await ensureTrimesh(pylons[i].n, pylons[i].p, new Vec3(1.2, 5, 1.2), C.column), grpArch);
  }

  await parentUnder(await ensureTrimesh('Arrival_PulseArena', new Vec3(7, 0.04, 12), new Vec3(12, 0.08, 8), C.pulse), grpFloor);
  const meshA = await ensureTrimesh('VybePulsePadMeshA', new Vec3(4, 0.1, 14), new Vec3(1.6, 0.15, 1.6), C.cyan);
  const meshB = await ensureTrimesh('VybePulsePadMeshB', new Vec3(7, 0.1, 14), new Vec3(1.6, 0.15, 1.6), C.cyan);
  const meshC = await ensureTrimesh('VybePulsePadMeshC', new Vec3(10, 0.1, 14), new Vec3(1.6, 0.15, 1.6), C.cyan);
  await parentUnder(meshA, grpFurn);
  await parentUnder(meshB, grpFurn);
  await parentUnder(meshC, grpFurn);
  const portalMesh = await ensureTrimesh('Arrival_PortalPadMesh', new Vec3(-8, 0.08, 12), new Vec3(4, 0.12, 4), C.portal);
  await parentUnder(portalMesh, grpFurn);

  await parentUnder(await ensureSeat('Arrival_Seat_A', new Vec3(-6, 0.2, 3)), grpFurn);
  await parentUnder(await ensureSeat('Arrival_Seat_B', new Vec3(-8, 0.2, 5)), grpFurn);
  await parentUnder(await ensureSeat('Arrival_Seat_C', new Vec3(6, 0.2, 3)), grpFurn);
  await parentUnder(await ensureSeat('Arrival_Seat_D', new Vec3(8, 0.2, 5)), grpFurn);

  await parentUnder(await ensureText('VybeWelcomeSign', new Vec3(0, 5.5, -7), 'VYBE', new Vec3(3, 3, 3)), grpSign);
  await parentUnder(await ensureText('Arrival_WayHub', new Vec3(0, 2.2, 18), '→ SOCIAL HUB', new Vec3(1.2, 1.2, 1.2)), grpSign);

  await parentUnder(await ensureLight('VybePlazaKeyLight', new Vec3(0, 14, 0), 1.2, '#fff4e6'), grpLight);
  await parentUnder(await ensureLight('Arrival_PathLamp_N1', new Vec3(-3, 3, 10), 0.5, '#FFB86B'), grpLight);
  await parentUnder(await ensureLight('Arrival_PathLamp_N2', new Vec3(3, 3, 10), 0.5, '#FFB86B'), grpLight);

  const amb = await ensureNamed('Arrival_AmbientAudio', async () => Editor.spawnAmbientAudio('Arrival_AmbientAudio'));
  await amb.setPosition(new Vec3(0, 2, 0));
  await parentUnder(amb, grpLight);

  const spawnPoint = await ensureSpawn('VybeSpawnPoint', new Vec3(0, 0.15, 5));
  const recovery = await ensureTrigger('VybeRecoveryVolume', new Vec3(0, -8, 0), new Vec3(120, 2, 120));
  await parentUnder(spawnPoint, grpIx);
  await parentUnder(recovery, grpIx);

  const spawnSystem = await ensureEmpty('VybeSpawnSystem', new Vec3(0, 1, 0));
  await parentUnder(spawnSystem, grpSys);
  if (await attachScript(spawnSystem, 'VybeSpawnRecovery')) {
    await spawnSystem.setScriptVariable('spawnPoint', spawnPoint);
    await spawnSystem.setScriptVariable('recoveryTrigger', recovery);
    await spawnSystem.setScriptVariable('teleportOnJoin', true);
    await spawnSystem.setScriptVariable('enableRecovery', true);
    await spawnSystem.setScriptVariable('debugLogs', false);
  }

  const lifecycle = await ensureEmpty('VybePlayerLifecycle', new Vec3(0, 1.2, 0));
  await parentUnder(lifecycle, grpSys);
  if (await attachScript(lifecycle, 'VybePlayerLifecycle')) {
    await lifecycle.setScriptVariable('showWelcomePopup', true);
    await lifecycle.setScriptVariable('debugLogs', false);
  }

  const bootstrap = await ensureEmpty('VybeBootstrap', new Vec3(0, 1.4, -1));
  await parentUnder(bootstrap, grpSys);
  if (await attachScript(bootstrap, 'VybeBootstrapSmoke')) {
    await bootstrap.setScriptVariable('debugLogs', false);
  }

  const directoryTrigger = await ensureTrigger('VybeDirectoryTrigger', new Vec3(-7, 1, -2), new Vec3(3, 2.5, 3));
  const directorySign = await ensureText('VybeDirectorySign', new Vec3(-7, 2.4, -3.2), 'DIRECTORY', new Vec3(1.2, 1.2, 1.2));
  await parentUnder(directoryTrigger, grpIx);
  await parentUnder(directorySign, grpSign);
  const directory = await ensureEmpty('VybeDirectory', new Vec3(-6, 1, -2));
  await parentUnder(directory, grpSys);
  if (await attachScript(directory, 'VybeWorldDirectory')) {
    await directory.setScriptVariable('directoryTrigger', directoryTrigger);
    await directory.setScriptVariable('directoryText', directorySign);
    await directory.setScriptVariable('landmarkMesh', landmark);
    await directory.setScriptVariable('popupSeconds', 4);
    await directory.setScriptVariable('debugLogs', false);
  }

  const checkInTrigger = await ensureTrigger('VybeCheckInTrigger', new Vec3(8, 1, 2), new Vec3(3.5, 2.5, 3.5));
  const checkInSign = await ensureText('VybeCheckInSign', new Vec3(8, 2.4, 0.5), 'CHECK-IN', new Vec3(1.2, 1.2, 1.2));
  await parentUnder(checkInTrigger, grpIx);
  await parentUnder(checkInSign, grpSign);
  const socialCheckIn = await ensureEmpty('VybeSocialCheckIn', new Vec3(7, 1, 2));
  await parentUnder(socialCheckIn, grpSys);
  if (await attachScript(socialCheckIn, 'VybeSocialCheckIn')) {
    await socialCheckIn.setScriptVariable('checkInTrigger', checkInTrigger);
    await socialCheckIn.setScriptVariable('signText', checkInSign);
    await socialCheckIn.setScriptVariable('cooldownSeconds', 8);
    await socialCheckIn.setScriptVariable('debugLogs', false);
  }

  const portalTrigger = await ensureTrigger('VybePortalPadTrigger', new Vec3(-8, 1, 12), new Vec3(3, 2.5, 3));
  const portalDest = await ensureSpawn('VybePortalDestination', new Vec3(0, 0.15, 22));
  await parentUnder(portalTrigger, grpIx);
  await parentUnder(portalDest, grpIx);
  const portalPad = await ensureEmpty('VybePortalPad', new Vec3(-7, 1, 12));
  await parentUnder(portalPad, grpSys);
  if (await attachScript(portalPad, 'VybePortalPad')) {
    await portalPad.setScriptVariable('padTrigger', portalTrigger);
    await portalPad.setScriptVariable('destinationSpawn', portalDest);
    await portalPad.setScriptVariable('padMesh', portalMesh);
    await portalPad.setScriptVariable('cooldownSeconds', 1.5);
    await portalPad.setScriptVariable('debugLogs', false);
  }

  const pulseStart = await ensureTrigger('VybePulseStart', new Vec3(7, 1, 10), new Vec3(2, 2, 2));
  const pulseLeave = await ensureTrigger('VybePulseLeave', new Vec3(2, 1, 14), new Vec3(2, 2, 2));
  const pulseReset = await ensureTrigger('VybePulseReset', new Vec3(12, 1, 10), new Vec3(2, 2, 2));
  const padA = await ensureTrigger('VybePulsePadA', new Vec3(4, 1, 14), new Vec3(1.8, 2, 1.8));
  const padB = await ensureTrigger('VybePulsePadB', new Vec3(7, 1, 14), new Vec3(1.8, 2, 1.8));
  const padC = await ensureTrigger('VybePulsePadC', new Vec3(10, 1, 14), new Vec3(1.8, 2, 1.8));
  const scoreboard = await ensureText('VybePulseScoreboard', new Vec3(7, 3, 16), 'PULSE', new Vec3(1.5, 1.5, 1.5));
  await parentUnder(pulseStart, grpIx);
  await parentUnder(pulseLeave, grpIx);
  await parentUnder(pulseReset, grpIx);
  await parentUnder(padA, grpIx);
  await parentUnder(padB, grpIx);
  await parentUnder(padC, grpIx);
  await parentUnder(scoreboard, grpSign);

  const pulse = await ensureEmpty('VybePulseChallenge', new Vec3(6, 1, 12));
  await parentUnder(pulse, grpSys);
  if (await attachScript(pulse, 'VybePulseChallenge')) {
    await pulse.setScriptVariable('startTrigger', pulseStart);
    await pulse.setScriptVariable('leaveTrigger', pulseLeave);
    await pulse.setScriptVariable('resetTrigger', pulseReset);
    await pulse.setScriptVariable('padATrigger', padA);
    await pulse.setScriptVariable('padBTrigger', padB);
    await pulse.setScriptVariable('padCTrigger', padC);
    await pulse.setScriptVariable('padAMesh', meshA);
    await pulse.setScriptVariable('padBMesh', meshB);
    await pulse.setScriptVariable('padCMesh', meshC);
    await pulse.setScriptVariable('scoreboardText', scoreboard);
    await pulse.setScriptVariable('debugLogs', false);
  }

  const audioEnv = await ensureEmpty('VybeAmbience', new Vec3(1, 1, 0));
  await parentUnder(audioEnv, grpSys);
  if (await attachScript(audioEnv, 'VybeAudioEnvironment')) {
    await audioEnv.setScriptVariable('playOnStart', false);
    await audioEnv.setScriptVariable('debugLogs', false);
  }

  await hideIfExists('VybeLockedCreatorRoot');
  await hideIfExists('VybeLockedGameRoot');
  await hideIfExists('VybeLockedEventRoot');
  await hideIfExists('VybeLockedMarketplaceRoot');
  await ensureEmpty('VybeLockedCreatorRoot', new Vec3(40, 0, 0));
  await ensureEmpty('VybeLockedGameRoot', new Vec3(45, 0, 0));
  await ensureEmpty('VybeLockedEventRoot', new Vec3(50, 0, 0));
  await ensureEmpty('VybeLockedMarketplaceRoot', new Vec3(55, 0, 0));
  await hideIfExists('VybeLockedCreatorRoot');
  await hideIfExists('VybeLockedGameRoot');
  await hideIfExists('VybeLockedEventRoot');
  await hideIfExists('VybeLockedMarketplaceRoot');
}

async function buildShell(): Promise<void> {
  const worldRoot = await ensureGroup('VYBE_WORLD_ROOT', new Vec3(0, 0, 0));
  const pathways = await ensureGroup('11_PATHWAYS', new Vec3(0, 0, 0));
  const quarantine = await ensureGroup('_VYBE_LEGACY_QUARANTINE', new Vec3(0, -50, 0));
  await parentUnder(pathways, worldRoot);
  await parentUnder(quarantine, worldRoot);
  try {
    await quarantine.setVisible(false);
  } catch (_e) {
    // ignore
  }

  const arrival = Editor.findByName('01_ARRIVAL_PLAZA');
  if (arrival.length > 0) {
    await parentUnder(arrival[0], worldRoot);
  }

  type Zone = {
    folder: string;
    center: Vec3;
    floorName: string;
    floorScale: Vec3;
    landmarkName: string;
    landmarkPos: Vec3;
    landmarkScale: Vec3;
    tint: string;
    signName: string;
    signText: string;
    spawnName: string;
    spawnPos: Vec3;
    hideShell: boolean;
  };

  const zones: Zone[] = [
    {
      folder: '02_SOCIAL_PULSE_HUB',
      center: new Vec3(0, 0, 55),
      floorName: 'Hub_Floor',
      floorScale: new Vec3(60, 0.1, 55),
      landmarkName: 'Hub_CentralLandmark',
      landmarkPos: new Vec3(0, 4, 55),
      landmarkScale: new Vec3(4, 8, 4),
      tint: C.hub,
      signName: 'Hub_TitleSign',
      signText: 'SOCIAL PULSE HUB',
      spawnName: 'Hub_RecoverySpawn',
      spawnPos: new Vec3(0, 0.15, 45),
      hideShell: false,
    },
    {
      folder: '03_CREATOR_DISTRICT',
      center: new Vec3(-70, 0, 55),
      floorName: 'Creator_Floor',
      floorScale: new Vec3(55, 0.1, 60),
      landmarkName: 'Creator_StageLandmark',
      landmarkPos: new Vec3(-70, 3.5, 55),
      landmarkScale: new Vec3(8, 1.2, 5),
      tint: C.creator,
      signName: 'Creator_TitleSign',
      signText: 'CREATOR',
      spawnName: 'Creator_RecoverySpawn',
      spawnPos: new Vec3(-70, 0.15, 40),
      hideShell: true,
    },
    {
      folder: '04_VYBE_LIVE_VENUE',
      center: new Vec3(75, 0, 60),
      floorName: 'Venue_Floor',
      floorScale: new Vec3(70, 0.1, 75),
      landmarkName: 'Venue_MainStage',
      landmarkPos: new Vec3(75, 1.2, 75),
      landmarkScale: new Vec3(20, 1.5, 10),
      tint: C.venue,
      signName: 'Venue_TitleSign',
      signText: 'VYBE LIVE',
      spawnName: 'Venue_RecoverySpawn',
      spawnPos: new Vec3(75, 0.15, 35),
      hideShell: true,
    },
    {
      folder: '05_GAME_LOUNGE',
      center: new Vec3(-70, 0, -45),
      floorName: 'Games_Floor',
      floorScale: new Vec3(65, 0.1, 60),
      landmarkName: 'Games_CentralLandmark',
      landmarkPos: new Vec3(-70, 3, -45),
      landmarkScale: new Vec3(5, 6, 5),
      tint: C.games,
      signName: 'Games_TitleSign',
      signText: 'GAME LOUNGE',
      spawnName: 'Games_RecoverySpawn',
      spawnPos: new Vec3(-70, 0.15, -30),
      hideShell: true,
    },
    {
      folder: '06_DISCOVERY_BOULEVARD',
      center: new Vec3(70, 0, -45),
      floorName: 'Discovery_Floor',
      floorScale: new Vec3(60, 0.1, 60),
      landmarkName: 'Discovery_Landmark',
      landmarkPos: new Vec3(70, 3, -45),
      landmarkScale: new Vec3(4, 6, 4),
      tint: C.discovery,
      signName: 'Discovery_TitleSign',
      signText: 'DISCOVERY',
      spawnName: 'Discovery_RecoverySpawn',
      spawnPos: new Vec3(70, 0.15, -30),
      hideShell: true,
    },
    {
      folder: '09_SAFETY_HELP_CENTER',
      center: new Vec3(0, 0, -65),
      floorName: 'Safety_Floor',
      floorScale: new Vec3(35, 0.1, 30),
      landmarkName: 'Safety_Landmark',
      landmarkPos: new Vec3(0, 2.5, -65),
      landmarkScale: new Vec3(3, 5, 3),
      tint: C.safety,
      signName: 'Safety_TitleSign',
      signText: 'SAFETY',
      spawnName: 'Safety_RecoverySpawn',
      spawnPos: new Vec3(0, 0.15, -60),
      hideShell: false,
    },
  ];

  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    const folder = await ensureGroup(z.folder, z.center);
    await parentUnder(folder, worldRoot);
    await parentUnder(await ensureTrimesh(z.floorName, z.center, z.floorScale, C.floor), folder);
    await parentUnder(await ensureTrimesh(z.landmarkName, z.landmarkPos, z.landmarkScale, z.tint), folder);
    await parentUnder(await ensureText(z.signName, new Vec3(z.center.x, 3.5, z.center.z - 8), z.signText, new Vec3(1.5, 1.5, 1.5)), folder);
    await parentUnder(await ensureSpawn(z.spawnName, z.spawnPos), folder);
    if (z.hideShell) {
      try {
        await folder.setVisible(false);
      } catch (_e) {
        // ignore
      }
    }
  }

  await parentUnder(await ensureTrimesh('Path_P1_Arrival_to_Hub', new Vec3(0, -0.04, 28), new Vec3(6, 0.08, 20), C.path), pathways);
  await parentUnder(await ensureTrimesh('Path_P9_Arrival_to_Safety', new Vec3(0, -0.04, -42), new Vec3(5, 0.08, 18), C.path), pathways);
  await parentUnder(await ensureLight('Global_RimLight', new Vec3(0, 40, 40), 0.4, '#d0e8ff'), worldRoot);
}

async function buildSocialDistrict(): Promise<void> {
  const HUB = new Vec3(0, 0, 55);
  const gatherMesh = await ensureTrimesh('VybeSocialDistrictGatherMesh', new Vec3(HUB.x, 0.08, HUB.z), new Vec3(8, 0.12, 8), C.cyan);
  const directoryTrigger = await ensureTrigger('VybeSocialDistrictDirectoryTrigger', new Vec3(HUB.x - 6, 1, HUB.z - 4), new Vec3(2.5, 2.5, 2.5));
  const directoryText = await ensureText('VybeSocialDistrictDirectorySign', new Vec3(HUB.x - 6, 2.2, HUB.z - 5), 'SOCIAL DISTRICT', new Vec3(1.2, 1.2, 1.2));
  const gatherTrigger = await ensureTrigger('VybeSocialDistrictGatherTrigger', new Vec3(HUB.x, 1, HUB.z), new Vec3(4, 2.5, 4));
  const gatherSign = await ensureText('VybeSocialDistrictGatherSign', new Vec3(HUB.x, 2.4, HUB.z + 3), 'GATHER', new Vec3(1.2, 1.2, 1.2));
  const districtSpawn = await ensureSpawn('VybeSocialDistrictSpawn', new Vec3(HUB.x, 0.15, HUB.z - 8));
  const toDistrictTrigger = await ensureTrigger('VybeToSocialDistrictTrigger', new Vec3(0, 1, 18), new Vec3(3, 2.5, 3));
  await ensureTrimesh('VybeToSocialDistrictPad', new Vec3(0, 0.06, 18), new Vec3(4, 0.1, 4), C.portals);
  await ensureText('VybeToSocialDistrictSign', new Vec3(0, 2.2, 18), 'TO SOCIAL HUB →', new Vec3(1.2, 1.2, 1.2));
  const returnTrigger = await ensureTrigger('VybeSocialDistrictReturnTrigger', new Vec3(HUB.x, 1, HUB.z + 12), new Vec3(3, 2.5, 3));
  await ensureText('VybeSocialDistrictReturnSign', new Vec3(HUB.x, 2.2, HUB.z + 12), '← PLAZA', new Vec3(1.2, 1.2, 1.2));

  let returnSpawnEntity: EditableEntity;
  const existingSpawn = Editor.findByName('VybeSpawnPoint');
  if (existingSpawn.length > 0) {
    returnSpawnEntity = existingSpawn[0];
  } else {
    returnSpawnEntity = await ensureSpawn('VybeSocialDistrictReturnSpawn', new Vec3(0, 0.15, 5));
  }

  const lockedCreator =
    Editor.findByName('VybeLockedCreatorRoot')[0] ||
    (await ensureEmpty('VybeLockedCreatorRoot', new Vec3(40, 0, 0)));
  const lockedGame =
    Editor.findByName('VybeLockedGameRoot')[0] ||
    (await ensureEmpty('VybeLockedGameRoot', new Vec3(45, 0, 0)));
  const lockedEvent =
    Editor.findByName('VybeLockedEventRoot')[0] ||
    (await ensureEmpty('VybeLockedEventRoot', new Vec3(50, 0, 0)));
  const lockedMarket =
    Editor.findByName('VybeLockedMarketplaceRoot')[0] ||
    (await ensureEmpty('VybeLockedMarketplaceRoot', new Vec3(55, 0, 0)));

  const root = await ensureEmpty('VybeSocialDistrict', new Vec3(HUB.x, 1.5, HUB.z));
  if (await attachScript(root, 'VybeSocialDistrict')) {
    await root.setScriptVariable('directoryTrigger', directoryTrigger);
    await root.setScriptVariable('directoryText', directoryText);
    await root.setScriptVariable('gatherTrigger', gatherTrigger);
    await root.setScriptVariable('gatherSign', gatherSign);
    await root.setScriptVariable('gatherMesh', gatherMesh);
    await root.setScriptVariable('toDistrictTrigger', toDistrictTrigger);
    await root.setScriptVariable('districtSpawn', districtSpawn);
    await root.setScriptVariable('returnTrigger', returnTrigger);
    await root.setScriptVariable('returnSpawn', returnSpawnEntity);
    await root.setScriptVariable('lockedCreatorRoot', lockedCreator);
    await root.setScriptVariable('lockedGameRoot', lockedGame);
    await root.setScriptVariable('lockedEventRoot', lockedEvent);
    await root.setScriptVariable('lockedMarketplaceRoot', lockedMarket);
    await root.setScriptVariable('checkInCooldownSeconds', 8);
    await root.setScriptVariable('portalCooldownSeconds', 1.5);
    await root.setScriptVariable('debugLogs', false);
  }
}

async function wireOptionalGames(): Promise<void> {
  // Scavenger — Discovery area near hub for visibility; hide unfinished discovery shell remains
  const scavRoot = await ensureEmpty('VybeScavengerHunt', new Vec3(12, 1, 20));
  const scavStart = await ensureTrigger('VybeScavengerStart', new Vec3(12, 1, 18), new Vec3(2.5, 2, 2.5));
  const item1 = await ensureTrigger('VybeScavengerItem1', new Vec3(-10, 1, 8), new Vec3(2, 2, 2));
  const item2 = await ensureTrigger('VybeScavengerItem2', new Vec3(10, 1, -6), new Vec3(2, 2, 2));
  const item3 = await ensureTrigger('VybeScavengerItem3', new Vec3(0, 1, 16), new Vec3(2, 2, 2));
  const scavBoard = await ensureText('VybeScavengerScoreboard', new Vec3(12, 2.5, 20), 'QUEST', new Vec3(1.2, 1.2, 1.2));
  if (await attachScript(scavRoot, 'ScavengerHunt')) {
    await scavRoot.setScriptVariable('startTrigger', scavStart);
    await scavRoot.setScriptVariable('item1Trigger', item1);
    await scavRoot.setScriptVariable('item2Trigger', item2);
    await scavRoot.setScriptVariable('item3Trigger', item3);
    await scavRoot.setScriptVariable('scoreboard', scavBoard);
  }

  const jumpRoot = await ensureEmpty('VybeJumpPad', new Vec3(-10, 1, 10));
  const jumpTrig = await ensureTrigger('VybeJumpPadTrigger', new Vec3(-10, 1, 10), new Vec3(2.5, 2, 2.5));
  if (await attachScript(jumpRoot, 'JumpPad')) {
    // JumpPad may use entity itself as trigger in some versions — wire common props if present
    try {
      await jumpRoot.setScriptVariable('trigger', jumpTrig);
    } catch (_e) {
      // optional prop name variance
    }
  }

  const celeRoot = await ensureEmpty('VybeCelebration', new Vec3(0, 1, 8));
  const celeTrig = await ensureTrigger('VybeCelebrationTrigger', new Vec3(0, 1, 8), new Vec3(2.5, 2, 2.5));
  if (await attachScript(celeTrig, 'CelebrationButton')) {
    // CelebrationButton listens on its own entity trigger — attach to trigger entity
  } else if (await attachScript(celeRoot, 'CelebrationButton')) {
    try {
      await celeRoot.setScriptVariable('cooldownSeconds', 5);
    } catch (_e) {
      // ignore
    }
  }
}

async function main() {
  Editor.beginUndoStack();
  console.log('[VybeBuildEverything] START — structure + wiring (world 1192248460643536)');
  console.log('[VybeBuildEverything] NOTE: Trimesh placeholders may be invisible until Code and Act creates visible shapes.');

  try {
    if (Editor.world && typeof Editor.world.setName === 'function') {
      await Editor.world.setName('Vybe Social');
    }
  } catch (_e) {
    // optional
  }

  await buildPlazaAndWire();
  await buildShell();
  await buildSocialDistrict();
  await wireOptionalGames();

  Editor.endUndoStack();
  console.log('[VybeBuildEverything] DONE — hierarchy, gameplay wiring, seats, lights, district, optional games.');
  console.log('[VybeBuildEverything] NEXT: Meta Gen AI must create VISIBLE floors/buildings (see TEN-WORD prompt).');
  console.log('[VybeBuildEverything] Register Persistent Variables: vybe_checkin_count, scavengerItem1, scavengerItem2, scavengerItem3');
}

main();
