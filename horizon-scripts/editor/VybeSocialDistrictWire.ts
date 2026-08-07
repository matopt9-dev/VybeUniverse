/**
 * Vybe Social — Social District entities + wire VybeSocialDistrict props.
 * World ID: 1192248460643536
 *
 * EDITOR SCRIPT ONLY (horizon/editor). Run once after plaza + shell.
 * Idempotent by exact entity name. Places district at Social Pulse Hub (0,0,55).
 */
import {
  Editor,
  EditorEntityType,
  MotionType,
  EditableEntity,
  TriggerEntity,
  TextEntity,
  TrimeshEntity,
} from 'horizon/editor';
import { Vec3, Quaternion } from 'horizon/core';

const Q = Quaternion.one;
const HUB = new Vec3(0, 0, 55);

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

async function attachScript(entity: EditableEntity, scriptName: string): Promise<boolean> {
  const script = Editor.getScriptByName(scriptName);
  if (!script) {
    console.error(`[VybeSocialDistrictWire] Script ${scriptName} not found`);
    return false;
  }
  await entity.setScript(script);
  return true;
}

async function main() {
  Editor.beginUndoStack();

  const gatherMesh = await ensureTrimesh(
    'VybeSocialDistrictGatherMesh',
    new Vec3(HUB.x, 0.08, HUB.z),
    new Vec3(8, 0.12, 8),
    '#3ec8e0'
  );

  const directoryTrigger = await ensureTrigger(
    'VybeSocialDistrictDirectoryTrigger',
    new Vec3(HUB.x - 6, 1, HUB.z - 4),
    new Vec3(2.5, 2.5, 2.5)
  );
  const directoryText = await ensureText(
    'VybeSocialDistrictDirectorySign',
    new Vec3(HUB.x - 6, 2.2, HUB.z - 5),
    'SOCIAL DISTRICT',
    new Vec3(1.2, 1.2, 1.2)
  );

  const gatherTrigger = await ensureTrigger(
    'VybeSocialDistrictGatherTrigger',
    new Vec3(HUB.x, 1, HUB.z),
    new Vec3(4, 2.5, 4)
  );
  const gatherSign = await ensureText(
    'VybeSocialDistrictGatherSign',
    new Vec3(HUB.x, 2.4, HUB.z + 3),
    'GATHER / CHECK-IN',
    new Vec3(1.2, 1.2, 1.2)
  );

  const districtSpawn = await ensureSpawn(
    'VybeSocialDistrictSpawn',
    new Vec3(HUB.x, 0.15, HUB.z - 8)
  );

  const toDistrictTrigger = await ensureTrigger(
    'VybeToSocialDistrictTrigger',
    new Vec3(0, 1, 18),
    new Vec3(3, 2.5, 3)
  );
  await ensureTrimesh(
    'VybeToSocialDistrictPad',
    new Vec3(0, 0.06, 18),
    new Vec3(4, 0.1, 4),
    '#ffe08a'
  );
  await ensureText(
    'VybeToSocialDistrictSign',
    new Vec3(0, 2.2, 18),
    'TO SOCIAL HUB →',
    new Vec3(1.2, 1.2, 1.2)
  );

  const returnTrigger = await ensureTrigger(
    'VybeSocialDistrictReturnTrigger',
    new Vec3(HUB.x, 1, HUB.z + 12),
    new Vec3(3, 2.5, 3)
  );
  await ensureText(
    'VybeSocialDistrictReturnSign',
    new Vec3(HUB.x, 2.2, HUB.z + 12),
    '← RETURN TO PLAZA',
    new Vec3(1.2, 1.2, 1.2)
  );

  // Prefer existing plaza spawn as return destination
  let returnSpawn = Editor.findByName('VybeSpawnPoint');
  let returnSpawnEntity: EditableEntity;
  if (returnSpawn.length > 0) {
    returnSpawnEntity = returnSpawn[0];
  } else {
    returnSpawnEntity = await ensureSpawn(
      'VybeSocialDistrictReturnSpawn',
      new Vec3(0, 0.15, 5)
    );
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

  Editor.endUndoStack();
  console.log('[VybeSocialDistrictWire] District entities created and props wired.');
}

main();
