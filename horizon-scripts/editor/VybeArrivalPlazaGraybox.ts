/**
 * Vybe Social VR — Arrival Plaza densified graybox + script wiring.
 * World ID: 1192248460643536
 *
 * RUN ONCE (Editor Scripts). Idempotent by exact entity name.
 * Proven APIs only: horizon/editor + Vec3/Quaternion from horizon/core.
 *
 * Creates named Trimesh placeholders, text, lights, triggers, spawns, and wiring.
 * IMPORTANT: spawnEntityByType(Trimesh) does not assign a mesh asset in this API.
 * Use Meta Code and Act or imported assets for visible floors and architecture.
 *
 * Does NOT: invent APIs, spawnAsset mystery IDs, Persistent Variables, Kenney import,
 * other districts (use VybeWorldShellZones), fake social feed/UI.
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
  floor: '#2a2d35',
  path: '#343a45',
  wall: '#c5ccd8',
  column: '#d8dee8',
  accent: '#f0a030',
  cyan: '#3ec8e0',
  seat: '#3a4250',
  pulse: '#333840',
  portal: '#1a3038',
  checkin: '#243040',
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

async function ensureTrigger(
  name: string,
  position: Vec3,
  scale: Vec3
): Promise<TriggerEntity> {
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
      // color optional
    }
  }
  try {
    await entity.setCollidable(collidable);
  } catch (_e) {
    // ignore
  }
  return entity;
}

async function ensureSeat(name: string, position: Vec3): Promise<EditableEntity> {
  const entity = await ensureNamed(name, async () => Editor.spawnSeat(name));
  await entity.setPosition(position);
  await entity.setRotation(Q);
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
    console.warn(`[VybePlaza] setParent failed for ${child.name}`);
  }
}

async function attachScript(entity: EditableEntity, scriptName: string): Promise<boolean> {
  const script = Editor.getScriptByName(scriptName);
  if (script == null) {
    console.error(`[VybePlaza] Script not found: ${scriptName}`);
    return false;
  }
  await entity.setScript(script);
  return true;
}

async function main() {
  Editor.beginUndoStack();
  console.log('[VybePlaza] Dense Arrival Plaza start — world 1192248460643536');

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

  // --- Floors (40x40 plaza per coordinate manifest) ---
  const floor = await ensureTrimesh(
    'VybePlazaFloor',
    new Vec3(0, -0.05, 0),
    new Vec3(40, 0.1, 40),
    C.floor
  );
  await parentUnder(floor, grpFloor);

  const welcomeRing = await ensureTrimesh(
    'Arrival_WelcomeRing',
    new Vec3(0, 0.02, 5),
    new Vec3(10, 0.06, 10),
    C.path
  );
  await parentUnder(welcomeRing, grpFloor);

  // Path stubs out of plaza (continuous later via WorldShell)
  const pathNorth = await ensureTrimesh(
    'Arrival_PathStub_ToHub',
    new Vec3(0, -0.04, 24),
    new Vec3(6, 0.08, 12),
    C.path
  );
  const pathSouth = await ensureTrimesh(
    'Arrival_PathStub_ToSafety',
    new Vec3(0, -0.04, -24),
    new Vec3(5, 0.08, 10),
    C.path
  );
  const pathSW = await ensureTrimesh(
    'Arrival_PathStub_ToGames',
    new Vec3(-18, -0.04, -12),
    new Vec3(14, 0.08, 5),
    C.path
  );
  const pathSE = await ensureTrimesh(
    'Arrival_PathStub_ToDiscovery',
    new Vec3(18, -0.04, -12),
    new Vec3(14, 0.08, 5),
    C.path
  );
  await parentUnder(pathNorth, grpFloor);
  await parentUnder(pathSouth, grpFloor);
  await parentUnder(pathSW, grpFloor);
  await parentUnder(pathSE, grpFloor);

  // --- Landmark + columns ---
  const landmark = await ensureTrimesh(
    'VybeWelcomeLandmark',
    new Vec3(0, 3, -8),
    new Vec3(3, 6, 1.4),
    C.accent
  );
  await parentUnder(landmark, grpArch);

  const canopy = await ensureTrimesh(
    'Arrival_Canopy',
    new Vec3(0, 6.5, -6),
    new Vec3(14, 0.25, 8),
    C.cyan,
    false
  );
  await parentUnder(canopy, grpArch);

  const colPositions: Array<{ name: string; p: Vec3 }> = [
    { name: 'Arrival_Column_NE', p: new Vec3(14, 2.5, 14) },
    { name: 'Arrival_Column_NW', p: new Vec3(-14, 2.5, 14) },
    { name: 'Arrival_Column_SE', p: new Vec3(14, 2.5, -14) },
    { name: 'Arrival_Column_SW', p: new Vec3(-14, 2.5, -14) },
    { name: 'Arrival_Column_N', p: new Vec3(0, 2.5, 16) },
    { name: 'Arrival_Column_S', p: new Vec3(0, 2.5, -16) },
  ];
  for (let i = 0; i < colPositions.length; i++) {
    const c = colPositions[i];
    const col = await ensureTrimesh(c.name, c.p, new Vec3(1.2, 5, 1.2), C.column);
    await parentUnder(col, grpArch);
  }

  // Perimeter walls with openings (north/south/east/west segments)
  const walls: Array<{ name: string; p: Vec3; s: Vec3 }> = [
    { name: 'Arrival_Wall_N_L', p: new Vec3(-10, 1.5, 19.5), s: new Vec3(12, 3, 0.6) },
    { name: 'Arrival_Wall_N_R', p: new Vec3(10, 1.5, 19.5), s: new Vec3(12, 3, 0.6) },
    { name: 'Arrival_Wall_S_L', p: new Vec3(-10, 1.5, -19.5), s: new Vec3(12, 3, 0.6) },
    { name: 'Arrival_Wall_S_R', p: new Vec3(10, 1.5, -19.5), s: new Vec3(12, 3, 0.6) },
    { name: 'Arrival_Wall_E_N', p: new Vec3(19.5, 1.5, 8), s: new Vec3(0.6, 3, 14) },
    { name: 'Arrival_Wall_E_S', p: new Vec3(19.5, 1.5, -8), s: new Vec3(0.6, 3, 14) },
    { name: 'Arrival_Wall_W_N', p: new Vec3(-19.5, 1.5, 8), s: new Vec3(0.6, 3, 14) },
    { name: 'Arrival_Wall_W_S', p: new Vec3(-19.5, 1.5, -8), s: new Vec3(0.6, 3, 14) },
  ];
  for (let i = 0; i < walls.length; i++) {
    const w = walls[i];
    const wall = await ensureTrimesh(w.name, w.p, w.s, C.wall);
    await parentUnder(wall, grpArch);
  }

  // Portal arch + pulse arena frame + directory kiosk
  const portalArchL = await ensureTrimesh(
    'Arrival_PortalArch_L',
    new Vec3(-9.5, 1.8, 12),
    new Vec3(0.5, 3.6, 0.5),
    C.cyan
  );
  const portalArchR = await ensureTrimesh(
    'Arrival_PortalArch_R',
    new Vec3(-6.5, 1.8, 12),
    new Vec3(0.5, 3.6, 0.5),
    C.cyan
  );
  const portalArchTop = await ensureTrimesh(
    'Arrival_PortalArch_Top',
    new Vec3(-8, 3.6, 12),
    new Vec3(3.5, 0.4, 0.5),
    C.cyan
  );
  await parentUnder(portalArchL, grpArch);
  await parentUnder(portalArchR, grpArch);
  await parentUnder(portalArchTop, grpArch);

  const pulseArena = await ensureTrimesh(
    'Arrival_PulseArenaFloor',
    new Vec3(7, 0.04, 14),
    new Vec3(10, 0.08, 6),
    C.pulse
  );
  await parentUnder(pulseArena, grpFloor);

  const dirKiosk = await ensureTrimesh(
    'Arrival_DirectoryKiosk',
    new Vec3(-7, 1.2, -3.5),
    new Vec3(2.2, 2.4, 0.4),
    C.wall
  );
  await parentUnder(dirKiosk, grpArch);

  // Activity meshes
  const meshA = await ensureTrimesh(
    'VybePulsePadA_Mesh',
    new Vec3(4, 0.08, 14),
    new Vec3(1.6, 0.12, 1.6),
    C.pulse
  );
  const meshB = await ensureTrimesh(
    'VybePulsePadB_Mesh',
    new Vec3(7, 0.08, 14),
    new Vec3(1.6, 0.12, 1.6),
    C.pulse
  );
  const meshC = await ensureTrimesh(
    'VybePulsePadC_Mesh',
    new Vec3(10, 0.08, 14),
    new Vec3(1.6, 0.12, 1.6),
    C.pulse
  );
  const portalMesh = await ensureTrimesh(
    'VybePortalPad_Mesh',
    new Vec3(-8, 0.08, 12),
    new Vec3(2.2, 0.12, 2.2),
    C.portal
  );
  const checkInRing = await ensureTrimesh(
    'VybeCheckInRing_Mesh',
    new Vec3(8, 0.06, 2),
    new Vec3(4, 0.08, 4),
    C.checkin
  );
  await parentUnder(meshA, grpIx);
  await parentUnder(meshB, grpIx);
  await parentUnder(meshC, grpIx);
  await parentUnder(portalMesh, grpIx);
  await parentUnder(checkInRing, grpIx);

  // Seating clusters (native Seat gizmos + bench meshes)
  const seatSpots: Array<{ name: string; p: Vec3 }> = [
    { name: 'Arrival_Seat_A1', p: new Vec3(-4, 0.1, 8) },
    { name: 'Arrival_Seat_A2', p: new Vec3(-2.5, 0.1, 9) },
    { name: 'Arrival_Seat_B1', p: new Vec3(4, 0.1, 8) },
    { name: 'Arrival_Seat_B2', p: new Vec3(5.5, 0.1, 9) },
    { name: 'Arrival_Seat_C1', p: new Vec3(-5, 0.1, -4) },
    { name: 'Arrival_Seat_C2', p: new Vec3(-3.5, 0.1, -5) },
  ];
  for (let i = 0; i < seatSpots.length; i++) {
    const s = seatSpots[i];
    const seat = await ensureSeat(s.name, s.p);
    await parentUnder(seat, grpFurn);
  }
  const bench1 = await ensureTrimesh(
    'Arrival_Bench_North',
    new Vec3(0, 0.35, 10),
    new Vec3(4, 0.5, 1),
    C.seat
  );
  const bench2 = await ensureTrimesh(
    'Arrival_Bench_East',
    new Vec3(12, 0.35, 0),
    new Vec3(1, 0.5, 4),
    C.seat
  );
  await parentUnder(bench1, grpFurn);
  await parentUnder(bench2, grpFurn);

  // Signage
  const welcomeSign = await ensureText('VybeWelcomeSign', new Vec3(0, 5.5, -7), 'VYBE', new Vec3(3, 3, 3));
  const mapSign = await ensureText(
    'Arrival_MapSign',
    new Vec3(-7, 2.6, -2.8),
    'MAP\nHub ↑\nGames ←\nDiscovery →\nSafety ↓',
    new Vec3(1.1, 1.1, 1.1)
  );
  const wayHub = await ensureText(
    'Arrival_Wayfind_Hub',
    new Vec3(0, 2.2, 18),
    'SOCIAL HUB →',
    new Vec3(1.4, 1.4, 1.4)
  );
  const waySafety = await ensureText(
    'Arrival_Wayfind_Safety',
    new Vec3(0, 2.2, -18),
    '← SAFETY / HELP',
    new Vec3(1.2, 1.2, 1.2)
  );
  await parentUnder(welcomeSign, grpSign);
  await parentUnder(mapSign, grpSign);
  await parentUnder(wayHub, grpSign);
  await parentUnder(waySafety, grpSign);

  // Lighting
  const key = await ensureLight('VybePlazaKeyLight', new Vec3(0, 14, 0), 1.2, '#fff4e6');
  const fillN = await ensureLight('Arrival_Fill_N', new Vec3(0, 10, 12), 0.7, '#e8f4ff');
  const fillS = await ensureLight('Arrival_Fill_S', new Vec3(0, 10, -10), 0.6, '#fff0e0');
  const accentL = await ensureLight('Arrival_Accent_Landmark', new Vec3(0, 8, -6), 0.9, C.accent);
  await parentUnder(key, grpLight);
  await parentUnder(fillN, grpLight);
  await parentUnder(fillS, grpLight);
  await parentUnder(accentL, grpLight);

  // AmbientAudio placeholder — assign clip in editor. Do NOT wire to
  // VybeAudioEnvironment until an AudioGizmo is confirmed (AmbientAudio ≠ AudioGizmo).
  const amb = await ensureNamed('Arrival_AmbientAudio', async () =>
    Editor.spawnAmbientAudio('Arrival_AmbientAudio')
  );
  await amb.setPosition(new Vec3(0, 2, 0));
  await parentUnder(amb, grpLight);
  void amb;

  // --- Spawn / recovery ---
  const spawnPoint = await ensureSpawn('VybeSpawnPoint', new Vec3(0, 0.15, 5));
  const recovery = await ensureTrigger(
    'VybeRecoveryVolume',
    new Vec3(0, -8, 0),
    new Vec3(120, 2, 120)
  );
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
    await bootstrap.setScriptVariable('debugLogs', true);
  }

  // Directory
  const directoryTrigger = await ensureTrigger(
    'VybeDirectoryTrigger',
    new Vec3(-7, 1, -2),
    new Vec3(3, 2.5, 3)
  );
  const directorySign = await ensureText(
    'VybeDirectorySign',
    new Vec3(-7, 2.4, -3.2),
    'DIRECTORY',
    new Vec3(1.2, 1.2, 1.2)
  );
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

  // Check-in
  const checkInTrigger = await ensureTrigger(
    'VybeCheckInTrigger',
    new Vec3(8, 1, 2),
    new Vec3(3.5, 2.5, 3.5)
  );
  const checkInSign = await ensureText(
    'VybeCheckInSign',
    new Vec3(8, 2.4, 0.2),
    'CHECK-IN',
    new Vec3(1.1, 1.1, 1.1)
  );
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

  // Portal
  const portalTrigger = await ensureTrigger(
    'VybePortalPadTrigger',
    new Vec3(-8, 1, 12),
    new Vec3(2.5, 2, 2.5)
  );
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

  // Pulse
  const pulseStart = await ensureTrigger('VybePulseStart', new Vec3(7, 1, 10), new Vec3(2, 2, 2));
  const pulseLeave = await ensureTrigger('VybePulseLeave', new Vec3(2, 1, 14), new Vec3(2, 2, 2));
  const pulseReset = await ensureTrigger('VybePulseReset', new Vec3(12, 1, 10), new Vec3(2, 2, 2));
  const padA = await ensureTrigger('VybePulsePadA', new Vec3(4, 1, 14), new Vec3(1.8, 2, 1.8));
  const padB = await ensureTrigger('VybePulsePadB', new Vec3(7, 1, 14), new Vec3(1.8, 2, 1.8));
  const padC = await ensureTrigger('VybePulsePadC', new Vec3(10, 1, 14), new Vec3(1.8, 2, 1.8));
  const scoreboard = await ensureText(
    'VybePulseScoreboard',
    new Vec3(7, 2.8, 16.5),
    'PULSE',
    new Vec3(1.3, 1.3, 1.3)
  );
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

  // Locked stubs (hidden)
  const lockedCreator = await ensureEmpty('VybeLockedCreatorRoot', new Vec3(40, 0, 0));
  const lockedGame = await ensureEmpty('VybeLockedGameRoot', new Vec3(45, 0, 0));
  const lockedEvent = await ensureEmpty('VybeLockedEventRoot', new Vec3(50, 0, 0));
  const lockedMarket = await ensureEmpty('VybeLockedMarketplaceRoot', new Vec3(55, 0, 0));
  try {
    await lockedCreator.setVisible(false);
    await lockedGame.setVisible(false);
    await lockedEvent.setVisible(false);
    await lockedMarket.setVisible(false);
  } catch (_e) {
    // ignore
  }

  Editor.endUndoStack();
  console.log('[VybePlaza] Dense plaza + wiring complete.');
  console.log('[VybePlaza] NEXT: run VybeWorldShellZones, then Preview. Register vybe_checkin_count.');
}

main();
